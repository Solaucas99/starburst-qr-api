import { JobOptions } from 'bull';
import { IMessage } from '../../../mail/IMailProvider';
import { TQueuesName } from '../../IMailQueueProvider';

export interface IJobs {
  options: JobOptions;
  key: TQueuesName;
  handle: ({ data }: { data: IMessage }) => Promise<void>;
}
