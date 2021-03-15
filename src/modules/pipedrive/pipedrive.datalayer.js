import { PipedriveLayer } from './pipedrive.layer';
import PipedriveService from './pipedrive.service';
import { AdapterJson } from './adpter-json';
import { NotifyOrder } from './notify-order';
import { requestLimiter, promiseHandler } from '../../core/utils/utils';

async function dataCollector() {
  try {
    const pipedriveLayer = new PipedriveLayer();

    const { deals } = await pipedriveLayer.getDeals();

    const createOrderlimiter = requestLimiter(5, 100, PipedriveService.createOrder);

    const dealsPopulated = await Promise.all(
      deals.map(deal => promiseHandler(createOrderlimiter(deal)))
    );

    const ordersXml = dealsPopulated
      .filter(({ success }) => success)
      .map(({ _, result: { orderBling, orderStore, isUpdate } }) => {
        return { orderBling: new AdapterJson().convertToXml(orderBling), orderStore, isUpdate };
      });

    ordersXml.forEach(({ orderBling, orderStore, isUpdate }) =>
      new NotifyOrder(orderBling, orderStore, isUpdate).notifyToBling()
    );
  } catch (error) {
    console.log(error);
  }
}

export { dataCollector };
