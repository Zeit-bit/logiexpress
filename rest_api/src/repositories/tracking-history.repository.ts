import { AppDataSource } from '../config/data_source.js';
import { TrackingHistory } from '../entities/tracking-history.entity.js';

export type CreateTrackingHistoryInput = Pick<
  TrackingHistory,
  'location' | 'state' | 'comments'
>;

export class TrackingHistoryRepository {
  private repository = AppDataSource.getRepository(TrackingHistory);

  async create(
    id_shipment: number,
    data: CreateTrackingHistoryInput,
  ): Promise<TrackingHistory> {
    const history = this.repository.create({
      id_shipment,
      location: data.location,
      state: data.state,
      comments: data.comments,
    });

    return this.repository.save(history);
  }
}

export const trackingHistoryRepository = new TrackingHistoryRepository();
