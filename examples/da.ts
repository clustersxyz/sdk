import { fetchClusterByAddress } from '../src/api';
import { Clusters } from '../src/index';

const daConfig = {
  manifestUploader: 'gY_w4fUF-8VHOIAdfDQa_hHU8Q8hjpePUpVpMTX84r0',
};
const clusters = new Clusters({ daConfig: daConfig });

const events = await clusters.getEventsDA();
console.log(events);
