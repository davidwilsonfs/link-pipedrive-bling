import PipedriveClient from './pipedrive.client';
import { OrderBuilder } from './order.builder';
import * as exception from './pipedrive.exceptions';
import { STAGE_WON } from './pipedrive.constants';
import { orderMount } from './order-mount';
import * as repository from './pipedrive.repository';

class PipedriveService {
  async createOrder(data) {
    try {
      const existData = await repository.getById(data.id);

      if (existData && data.status !== STAGE_WON) {
        await repository.update(existData.id, { status: data.status });
        exception.stageUpdated();
      } else if (data.status !== STAGE_WON || (existData && existData.status === STAGE_WON)) {
        exception.stageNotReached();
      }

      const { data: dealDetails } = await PipedriveClient.getDealDetails(data.id);
      const { data: dealProducts } = await PipedriveClient.getDealProducts(data.id);

      const payload = {
        products: dealProducts,
        deal_details: dealDetails,
      };

      const builder = new OrderBuilder(payload);

      builder.buildClient();
      builder.buildItens();

      return {
        orderBling: builder.order,
        orderStore: orderMount(payload),
        isUpdate: existData && existData.status !== STAGE_WON,
      };
    } catch (error) {
      throw error;
    }
  }

  async registeOrder(order) {
    try {
      await repository.register(order);
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      await repository.getById(id);
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      await repository.update(id, data);
    } catch (error) {
      throw error;
    }
  }
}

export default new PipedriveService();
