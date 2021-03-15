import { PipedriveLayer } from './pipedrive.layer';
import * as repository from './pipedrive.repository';
import PipedriveService from './pipedrive.service';
import { AdapterJson } from './adpter-json';
import { NotifyOrder } from './notify-order';
import { requestLimiter } from '../../core/utils/utils';

async function dataCollector() {
  try {
    const pipedriveLayer = new PipedriveLayer();

    const { deals } = await pipedriveLayer.getDeals();

    const dealsStored = await Promise.all(deals.map(deal => repository.getById(deal.id)));

    const dealsCandidates = deals.filter((deals, index) => {
      {
        return (!dealsStored[index] && deals.status === 'won') ||
          (!!dealsStored[index] && dealsStored[index].status === 'open' && deals.status === 'won')
          ? true
          : false;
      }
    });

    const createOrderlimiter = requestLimiter(5, 100, PipedriveService.createOrder);

    const dealsPopulated = await Promise.all(dealsCandidates.map(deal => createOrderlimiter(deal)));

    const ordersXml = dealsPopulated.map(({ orderBling }) =>
      new AdapterJson().convertToXml(orderBling)
    );

    ordersXml.forEach((order, index) =>
      new NotifyOrder(order, dealsPopulated[index].orderStore).notifyToBling()
    );
  } catch (error) {
    console.log(error);
  }
}

export { dataCollector };
