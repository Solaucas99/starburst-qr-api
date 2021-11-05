import Queue from 'bull';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';

import { IMessage } from '../../mail/IMailProvider';
import redisConfig from '../config/redis';
import * as jobs from './jobs';
import { IMailQueueProvider, TQueuesName } from '../IMailQueueProvider';

class BullQueueProvider implements IMailQueueProvider {
  constructor() {
    this.getUI = this.getUI.bind(this);
    this.ToMailQueue = this.ToMailQueue.bind(this);
    this.process = this.process.bind(this);
  }

  public queues = Object.values(jobs).map((job) => {
    return {
      bull: new Queue(job.key, redisConfig),
      name: job.key,
      handle: job.handle,
      options: job.options,
    };
  });

  public getUI(): any {
    const serverAdapter = new ExpressAdapter();
    createBullBoard({
      queues: this.queues.map((queue) => new BullAdapter(queue.bull)),
      serverAdapter,
    });

    serverAdapter.setBasePath('/admin/queues');
    return serverAdapter.getRouter();
  }

  public async ToMailQueue(
    message: IMessage,
    queueName: TQueuesName,
  ): Promise<Queue.Job<any> | undefined> {
    const queue = this.queues.find((queue) => queue.name === queueName);

    return await queue?.bull.add({ message }, queue.options);
  }

  public process(): void {
    return this.queues.forEach((queue) => {
      queue.bull.process(queue.handle);

      queue.bull.on('failed', (job, err) => {
        console.log('Job failed', queue.name, job.data);
        console.log(err);
      });

      queue.bull.on('error', (err) => {
        console.log('Job error', queue.name);
        console.log(err);
      });
    });
  }
}

export default new BullQueueProvider();
