// -*- mode: javascript; js-indent-level: 2 -*-

import * as core from '@actions/core'
import {SnapcraftPublisher} from './publish'

async function run(): Promise<void> {
  try {
    const loginData: string = core.getInput('store_login')
    const snapFiles: string[] = core.getInput('snap').split(':')
    const release: string = core.getInput('release')

    for (let snap of snapFiles) {
      snap = snap.trim()
      core.info(`Publishing snap "${snap}"...`)
      const publisher = new SnapcraftPublisher(loginData, snap, release)
      await publisher.validate()
      await publisher.publish()
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
