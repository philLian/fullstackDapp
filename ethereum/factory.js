import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x9d881A5C43A96a6bab7deb7AA6586E6a47F2dd15'
)

export default instance;
