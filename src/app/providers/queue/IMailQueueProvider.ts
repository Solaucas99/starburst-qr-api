import { Queue, JobOptions, Job } from 'bull';
import { IMessage } from '../mail/IMailProvider';

export type TQueuesName =
  | 'CancelVisitMail'
  | 'UpdateVisitorMail'
  | 'CodeSendVisitorMail'
  | 'SignUpVisitorMail'
  | 'ConfirmedVisitMail'
  | 'CodeSendUpdateVisitorMail';

export interface IMailQueueProvider {
  queues: {
    bull: Queue<any>;
    handle: ({ data }: { data: any }) => Promise<void>;
    name: string;
    options: JobOptions;
  }[];

  getUI: () => {
    getRouter: () => any;
  };

  ToMailQueue: (
    message: IMessage,
    queueName: TQueuesName,
  ) => Promise<Job<any> | undefined>;

  process: () => void;
}
