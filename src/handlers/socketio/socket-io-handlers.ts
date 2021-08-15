import { Socket } from "socket.io"
import _ from 'lodash'

import { DashboardStartParams } from "./types/dashboard"
import { ShootingActivitiesService } from "@/domain/contracts/services/shooting-activities-service"
import { ShootingActivityEndParams, ShootingActivityShotParams, ShootingActivityStartParams } from "./types/shooting-activity"

const socketIoHandlers = ({ shootingActivitiesService }: { shootingActivitiesService: ShootingActivitiesService }) => ({

  connection: (socket: Socket) => {

    socket.on('shot', (arg) => {
      console.log(arg)
    })
  
    socket.on('dashboard:start', (shootingRanges: DashboardStartParams) => {
      console.log('dashboard:start')
  
      if (shootingRanges && shootingRanges.length > 0) {
        shootingRanges.forEach((shootingRangeId: string) => {
          socket.join(`${shootingRangeId}`)
        })
      }
    })
  
    socket.on('shootingActivity:start', async (params: ShootingActivityStartParams) => {
      console.log('shootingActivity:start')

      const shootingActivity = await shootingActivitiesService.create(params)
  
      socket.shootingActivity = shootingActivity

      socket.join(`${shootingActivity.owner}`)
      socket.join(`${shootingActivity.shootingRange}`)
  
      socket.to(`${shootingActivity.shootingRange}`).emit('shootingRange:active', { shootingRangeId: shootingActivity.shootingRange })
      socket.to(`${shootingActivity.owner}`).emit('shootingActivity:started', { shootingActivityId: shootingActivity._id })
      console.log('server triggered shootingRange:active')
    })
  
    socket.on('shootingActivity:end', async () => {
      console.log('shootingActivity:end')

      const shootingActivityId = _.get(socket, 'shootingActivity._id', '')

      if (!shootingActivityId) {
        return
      }

      const shootingActivity = await shootingActivitiesService.close({ shootingActivityId })

      const shootingRangeId = shootingActivity.shootingRange
  
      if (shootingRangeId) {
        socket.to(`${shootingRangeId}`).emit('shootingActivity:ended', { shootingRangeId: shootingRangeId })
      }

      const ownerId = shootingActivity.owner

      if (ownerId) {
        socket.to(`${ownerId}`).emit('shootingActivity:ended', { shootingActivityId: shootingActivity._id })
      }

    })
  
    socket.on('shootingActivity:shot', (shotData: ShootingActivityShotParams) => {
      console.log('shootingActivity:shot')
  
      socket.to(`${shotData.shootingRangeId}`).emit('shootingActivity:shot:result', shotData)
    })
  
    socket.on('disconnect', () => {
      console.log('disconnect')
      const shootingRangeId = _.get(socket, 'shootingActivity.shootingRange', '')
  
      console.log(shootingRangeId)
  
      if (shootingRangeId) {
        console.log('emitting')
        socket.to(`${shootingRangeId}`).emit('socket:disconnect', { shootingRangeId: shootingRangeId })
      }
    })
  }
})

module.exports = socketIoHandlers