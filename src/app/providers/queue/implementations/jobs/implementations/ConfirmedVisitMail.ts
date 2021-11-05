import { JobOptions } from 'bull';
import { IMailProvider, IMessage } from '../../../../mail/IMailProvider';
import NodemailerProvider from '../../../../mail/implementations/NodemailerProvider';
import jobOptions from '../../../config/queueOptions';
import { TQueuesName } from '../../../IMailQueueProvider';
import { IJobs } from '../IJobs';

class ConfirmedVisitMailJob implements IJobs {
  public options: JobOptions = jobOptions;
  public key: TQueuesName = 'ConfirmedVisitMail';

  constructor(private mailProvider: IMailProvider) {
    this.handle = this.handle.bind(this);
  }

  public async handle({ data }: { data: any }): Promise<void> {
    try {
      const { message }: { message: IMessage } = data;
      await this.mailProvider.sendMail(message);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new ConfirmedVisitMailJob(NodemailerProvider);
