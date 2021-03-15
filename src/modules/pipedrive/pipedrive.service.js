import { OrderBuilder } from './order.builder';
import * as exception from './pipedrive.exceptions';
import { STAGE_WON } from './pipedrive.constants';
import { orderMount } from './order-mount';
import * as repository from './pipedrive.repository';
import pipedriveClient from '../../core/clients-http/pipedrive.client';

class PipedriveService {
  async createOrder(data) {
    try {
      const existData = await repository.getById(data.id);

      if (data.status !== STAGE_WON || existData) {
        exception.stageNotReached();
      }

      const { data: dealDetails } = await pipedriveClient.getDealDetails(data.id);
      const { products } = await pipedriveClient.getDealProducts(data.id);

      const payload = {
        products,
        deal_details: dealDetails,
      };

      const builder = new OrderBuilder(payload);

      builder.buildClient();
      builder.buildItens();

      return {
        orderBling: builder.order,
        orderStore: orderMount(payload),
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
      const { _id, ...restOfData } = await repository.getById(id);
      return { ...restOfData, ..._id };
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

  async getOpportunities() {
    try {
      const [{ _id, ...restOfData }] = await repository.agregateOpportunities();

      return { ...restOfData, ..._id };
    } catch (error) {
      throw error;
    }
  }
}

export default new PipedriveService();
