import { makeLoggerProvider } from '@greenacesso/logger'
import { CondominiumLotStatus } from '@prisma/client'

import { Database } from './database'

const database = Database.getInstance()
const now = new Date()

export const condominiumLotsSeed = [
  {
    id: '2f8abc0e-7e92-4aec-9e09-a1090bed8eca',
    name: '0001',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '8ebd3876-aa14-4332-b154-4b4aed829e8d',
    name: '0002',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '8c2cac7b-2758-41ca-a330-ab41b96852e7',
    name: '0033',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'e039bbc5-119e-4c98-8ecc-6d0495404158',
    name: '0200',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '28a9247d-99b5-4bf2-a437-03bf69f4c183',
    name: '4445',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '529ecdde-57f9-4609-9293-8804bb2575b2',
    name: '56533',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '3e91f9c9-83a2-497c-a0ad-3cd442941252',
    name: '0007',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '00a3ef14-90e4-4a3f-8c19-8fb4020f9f7d',
    name: '0008',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '1b44b6e2-7d46-47af-9ff0-6fa7e021a0a1',
    name: '0006',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '0efdc517-e3d0-4fa7-a095-0df5d68b5a9b',
    name: '0010',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'bd3abdb1-5e29-4c46-971b-4137b7f7e5c9',
    name: '2200',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '8b8e85fe-8d6b-4556-9307-7d0e6759e9b2',
    name: '0013',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'e7d8f3c7-9a2e-4a88-8a0b-2ab2ef9d6c45',
    name: '0014',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'b41ef8fe-bb5e-46d9-8f8a-5fbdb30bd633',
    name: '0015',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'fbd2af93-b357-4758-850d-6e95c765e2d2',
    name: '0016',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '9f4b26a1-d49e-4a9c-8b28-f56321b2594a',
    name: '0017',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'b1a74a5c-6df8-4c71-b64c-f8b427f6c3e4',
    name: '0018',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'e8380c7d-fd31-4b9b-a30b-247f3ce982c5',
    name: '0019',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '7e7adf5d-2f96-4ec7-bf10-7bb9d54cbbf4',
    name: '0020',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '0f2c3884-e17e-49e3-9f6d-07b5eb562ba1',
    name: '0021',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '9448db56-b25f-4de3-90ad-6b78595e76d0',
    name: '0022',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '4e4c1a6d-11f8-4e9d-a77b-e0be8d4c6be0',
    name: '0023',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '4c6e5f05-d2ef-43cf-8e9e-048b8e4055f7',
    name: '0024',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '2b4a4a5d-49ad-4702-9ed9-69f7a96a5f98',
    name: '0025',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'd8e4338f-9f43-4f9e-9686-75f94cf25bf0',
    name: '0026',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'e79d1f26-2281-4f56-9e16-86c9655d3b31',
    name: '0027',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '714d3d46-e449-4d0b-b9b5-0f6eec6fd80c',
    name: '0028',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '9c23e2fe-bd45-4c6b-8d46-4c7b040ec116',
    name: '0029',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '37c56f07-5a9d-4a44-9cbe-fbdf0555a68f',
    name: '0030',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '0a4fd3d3-f7e5-4e6b-b71b-2e0e8b5b0c4e',
    name: '0031',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '48e4d31b-1a93-4b99-8c88-2666ce97e79b',
    name: '0032',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '4fbe6a38-dcc4-4093-a7e2-cfc2faed32ec',
    name: '0034',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '56291f9d-46f7-4c48-9f1b-20e4beea1dff',
    name: '0035',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '47c2f681-24e6-49e5-884d-18941c16c0e7',
    name: '0036',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '2051a72e-1bbd-428d-b5d5-fbe46840ce9a',
    name: '0037',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '329c598d-49ec-4b1d-9ed0-65e75d6510fb',
    name: '0038',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '1dfed4eb-3c2c-4e6a-9625-15540cccf7ae',
    name: '0039',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'e168ec8a-3a09-4e6a-b42d-8e41368b74d1',
    name: '0040',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '6604ccfd-0494-4ab4-8892-174c065d05e9',
    name: '0041',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'e3e23d70-6ecb-4360-8e9b-fcbec18b08b2',
    name: '0042',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '6d1f9377-2b6a-4ae5-bf71-896f1f2fdcb5',
    name: '0043',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '7b6c8e28-ffaf-4f63-9e16-9afc8eb7a8e4',
    name: '0044',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '52b3aa2e-1e13-4f34-9b2f-e4f8829f6d11',
    name: '0045',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '573a4d6f-3507-4ef1-a71f-5ad0f48623af',
    name: '0046',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '4d2e9a25-13b0-4d96-a1ef-9c482e99c7e5',
    name: '0047',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '3272f748-4f70-41d3-8dfe-1b1e602f4ff7',
    name: '0048',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '07b2df93-e0df-4d0e-9739-54f5eb2a45cb',
    name: '0049',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '3b9d58f6-d88b-42d5-9448-75f3ef3d5743',
    name: '0050',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'd734cd5d-2354-4bd7-a8d9-42fbb21052ae',
    name: '0051',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'c474b8af-b51e-4c3b-9b65-2745f3af9e18',
    name: '0052',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '3b698751-8b35-4d52-99af-8760a82398e4',
    name: '0053',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '0e6a5b18-d971-47e5-a15b-4bce2efddf9c',
    name: '0054',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '7ab1bca9-79ef-4a3e-9500-fcc71546eaf6',
    name: '0055',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'ce189dbe-5673-4d20-9b5f-7e62c6c6722c',
    name: '0056',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '51c06e3c-fdec-4d50-a2dd-e6827a8a775c',
    name: '0057',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'c7d03f22-23b5-49cc-8b24-8f07e6e8d516',
    name: '0058',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '7c03e40c-e9bb-4e57-a3b5-14689874899b',
    name: '0059',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '21b7f9bd-b646-4f12-a6f5-e4e255e3c1e4',
    name: '0060',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '3cfb3f7f-2dbe-4f6e-87fb-6b204e658ed9',
    name: '0061',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'd01b6d57-6d5b-45f3-8c0d-77a79f8e9077',
    name: '0062',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'ca56754a-2df4-4ab5-9105-d2bdcd37d660',
    name: '0063',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'a258b60e-2af8-41ce-9d35-2996dc5fa94d',
    name: '0064',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '605b77d1-4ed3-40ad-9c2a-b1e82596e9ad',
    name: '0065',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '4d55ec6f-7488-4f1c-bf7a-298c403dc9bb',
    name: '0066',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'e9bcbcf2-10fb-4c34-9f18-32791f1407e3',
    name: '0067',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '86c57b49-5889-4493-b8d1-4e62d1f7c26c',
    name: '0068',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'ad13a82a-65ae-4b2e-86df-9875064e0840',
    name: '0069',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '05d53bf5-2a12-45d3-9c88-8ff3c9ceceaf',
    name: '0070',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'b8121e8c-d7d4-4fda-bd6e-6d5f3c54b9c7',
    name: '0071',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'ba6dc6cc-7355-4fae-b5ef-7c392e34a714',
    name: '0072',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'c1e36ce0-df4f-47c5-8f3c-618d5a3a5d1a',
    name: '0073',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '38cdb16e-6e31-4e46-a52f-09d20c082304',
    name: '0074',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'd343229e-e208-4a4e-9a60-1b90f1aab137',
    name: '0075',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '671d1c9f-93e1-46de-98d2-8e7ecfdb3af0',
    name: '0076',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'de8a04ab-59c0-4e78-884c-6e5f507bb4b9',
    name: '0077',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '3dd8cf3a-7697-4f24-94e1-8356dfed408b',
    name: '0078',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'ba61c933-4e01-46be-99d1-71d038b35be9',
    name: '0079',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '66efb708-e810-4bb5-bac1-6ed51f1ccfa2',
    name: '0080',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '94a10920-0ff5-4d02-8d5b-e93e0f04021b',
    name: '0081',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'd1be4b20-222b-4589-9f0b-90d64a884a66',
    name: '0082',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'a93b1e1b-6f96-479b-b3ed-fd91edff1cf8',
    name: '0083',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '0f45b0d0-b2ce-4b55-9b86-18b74b2cdbfe',
    name: '0084',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '6125f55b-86b2-4580-b6d9-4276c19b89e2',
    name: '0085',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'c0e4dd20-3759-41eb-b135-d55a33723f3d',
    name: '0086',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'd9d0bbd0-33a3-4864-8e21-987ec5d8802c',
    name: '0087',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '83f7746f-5d2b-48b4-b55d-22902d9c58b2',
    name: '0088',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '15e20e11-4b8a-4cb0-8d97-51b5bf1b5e80',
    name: '0089',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'a53f8d06-df61-4b22-91e4-5686eaa86557',
    name: '0090',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'a38d2ab1-20d9-4226-bd6b-316c59e643d2',
    name: '0091',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '66d9bf86-63d9-435e-97ad-1ff99593a0e3',
    name: '0092',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '2e7a8e49-7c0f-4a26-b409-1ae9385b6f26',
    name: '0093',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '4c57df31-0a19-482e-b3e0-2a6f0d9bff33',
    name: '0094',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '3b3c13a0-bde1-4e2b-8b7a-8c31b527c10f',
    name: '0095',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '947e5e7e-1454-4c26-a55f-7e8e6fbe1fa3',
    name: '0096',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '3a902e3f-9d7d-41ab-a071-5f68a9f4277d',
    name: '0097',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'f3f25dc7-4af3-4b9c-9e4f-6dfdb991b361',
    name: '0098',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '66288049-f525-4c6c-a5e1-6796c4cc80f2',
    name: '0099',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'f73553b1-09a3-4043-9b22-63bd17b4f8ba',
    name: '0100',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'a28b6df9-4f5f-422b-b66f-68d62b13cd5d',
    name: '0101',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'b31687b7-0a63-4c51-8f7e-63ce8226790e',
    name: '0102',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '8a0eb69f-9c49-4c9d-8554-269c16f2ed13',
    name: '0103',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '1247369b-8574-46a4-9c24-62ff5e32b74f',
    name: '0104',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'acb3120a-5e59-4cc4-8e12-21486c2b85c3',
    name: '0105',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '50c52bd2-d209-4ae0-b8f5-3ce4f6a7aede',
    name: '0106',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '34d1991c-9b55-4092-8860-d4b86d8bbabd',
    name: '0107',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '5bb86a20-8d6f-45e8-8e8c-f08c09d65c43',
    name: '0108',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '6a97ef79-c9b3-4711-8809-27e317e43365',
    name: '0109',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'f97d43fa-82b3-4213-b6d4-7a207bc37b5e',
    name: '0110',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '32615a5d-9b28-46a3-8f51-b2f9f8c225d7',
    name: '0111',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '78c89cd4-9a2c-4385-9dc6-3afec38db8ad',
    name: '0112',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'd36d7b44-e2fb-4b55-8e2c-51ef9c91a3d0',
    name: '0113',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'b4cd72c6-3b7b-49af-b2d7-4366e7e9bf62',
    name: '0114',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '6b1dd702-b5e2-4d66-8e10-3c23fdcb1480',
    name: '0115',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '5635a7c9-90a3-4ab1-bc1b-ef1799b6642e',
    name: '0116',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '0b33eb6e-c7eb-45cb-b3a7-4190506a60ca',
    name: '0117',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '16683912-39f2-46b5-a9a3-10944f704484',
    name: '0118',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'b9c1bd8d-fb9d-40f0-8b23-17cb09d5dd3a',
    name: '0119',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '6aecc68f-b2b1-41d4-bd4a-03b334d589f6',
    name: '0120',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '7042d7a0-4046-49c1-b35e-3cb01b12437a',
    name: '0121',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'ac50d122-14e2-4ac3-91ec-bf8fb6f60245',
    name: '0122',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'e0e72620-6e57-46c4-a3bb-9a3f3b80cf60',
    name: '0123',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '23671ce9-28b1-4b33-b7b2-2b5f59a6f7d5',
    name: '0124',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'a8ef00e3-7c11-41f3-9447-36c561f9cdd8',
    name: '0125',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'd0c65b8e-1100-4221-bd73-7fdb49ff1c4c',
    name: '0126',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '4f569d43-5ae1-4b46-8f9e-11866ed652b0',
    name: '0127',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '255fbfa2-d317-4e2c-9a10-41a3552c57e3',
    name: '0128',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '2f98bbed-4cfe-4c24-b357-63f83d6f7b53',
    name: '0129',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'beeea09e-c10e-4c14-a1d2-1c8684d857e3',
    name: '0130',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'ddcd7d45-c8c4-42e0-8e46-16242f92a5a2',
    name: '0131',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'c0e36c78-2c15-4c15-8c4a-75f5e76c3534',
    name: '0132',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'c8d93dc4-2c43-4d2e-9a45-6ef4a6ed15bd',
    name: '0133',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'c22915c9-624c-4e17-9a9f-ecb46e9f3c91',
    name: '0134',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'b1c7ae10-07ab-4e88-b7a6-55732cbbfab4',
    name: '0135',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '7a63c2ce-8f16-4e22-9cc7-348b47d7b7a0',
    name: '0136',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'd96bb9c9-1d47-4c9b-aef2-8d4d5a18f162',
    name: '0137',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '03c4f229-49ed-45e0-92be-5d7d9a1e29cf',
    name: '0138',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '11b2443e-5606-4b37-8e3d-75a5f8af5172',
    name: '0139',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '0a7c5d4c-01c2-4e8c-a2f2-6b93b51d9c42',
    name: '0140',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'c962c2be-0c3c-4f38-81c9-48d54c2a0eab',
    name: '0141',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '43de1d5e-86de-48d2-bef5-6e71430aab24',
    name: '0142',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'e6325f48-52bd-4f7a-8a45-1b4f55e91c14',
    name: '0143',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '6a134e9e-4964-4c6d-9ed6-842d45c308c9',
    name: '0144',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '5f1b9b3b-60c9-4e09-b3c0-5a1b88e9c0c7',
    name: '0145',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '14b14e8f-8350-4d9a-8e5b-42e126b55801',
    name: '0146',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'f7d1b4e2-23b7-4705-9b2f-4d1b6f2c2cf3',
    name: '0147',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '8dd9c7c3-8fb6-4703-91bd-76f5e3c8e1e9',
    name: '0148',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'b1a511e3-7b4b-41f9-915e-3f5b3a7cf69d',
    name: '0149',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '31f0d64f-1e90-4b59-9f16-15d1ef45b138',
    name: '0150',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'bfb6c237-e4ed-4027-a3b6-b6b4f879c1a4',
    name: '0151',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '83b8d338-2aa3-4d1f-8a64-9e2b37d5a5ef',
    name: '0152',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'df1d62f8-3b34-4ce7-bcd3-5ff6c847e492',
    name: '0153',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'aa02b915-46d9-49f4-b25c-f3e9b80b2a8d',
    name: '0154',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '9f7fbfec-5bc1-4f77-bdd6-5eec08d1d43b',
    name: '0155',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '49b4d1a6-6e3f-4e7a-a0c8-5cfce0e8323a',
    name: '0156',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '5c8af9a3-8c5e-4bd7-9e10-3ad4f3c5d9a3',
    name: '0157',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'a1b5d14e-3190-4608-bc4b-787d906271d0',
    name: '0158',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '4a8d8eb1-4b4f-4cf4-9a67-5d7b3c6c705c',
    name: '0159',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '6376c0b4-0f6d-4e31-a2f7-285ee3a2d04f',
    name: '0160',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'd759e7e3-04eb-4de5-9e9c-9a5e8fdf8f4e',
    name: '0161',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'd6a1b5e7-0a9b-42a9-bcd6-73e561bbf7d1',
    name: '0162',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '02a7e4d4-29e2-4700-b7d6-4e7c4a17ef24',
    name: '0163',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '72805d2e-f43d-48a3-9e7a-6e5bdb2a5dd8',
    name: '0164',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '2c5f61d1-2c6a-4a28-8d8b-1c9d13f8c761',
    name: '0165',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '04905b4a-feb2-4363-9e48-78464e3e706b',
    name: '0166',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '1bdfbc49-f50d-4f2c-beb6-4fbc0c3aeb71',
    name: '0167',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '6be9f3a1-3f17-4df4-9a70-6154bd763a14',
    name: '0168',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '9978a618-f449-4c6d-9e32-7e3a7c9e3d3a',
    name: '0169',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '3e8c9d62-58f6-4bda-b3a1-7c59e3a2e3e9',
    name: '0170',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'ab31f1b8-e6de-4f74-9b6b-3d7c5a7e6e4f',
    name: '0171',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '0dcd12e8-4c24-4db5-8ef7-3f6c5e5b7b7a',
    name: '0172',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'af9d562c-eeb1-41b1-9c5f-0d1c1e5e3d9a',
    name: '0173',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'f0a3b07b-3c79-43e3-a6c5-9f7d3e5b1e2a',
    name: '0174',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '5e0e98d8-75c4-46df-bd7d-60f7e9b4d3c5',
    name: '0175',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'bb8d1b23-85ad-4c59-ae8e-0d5c6b5d4e2a',
    name: '0176',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '0e1f3a4d-5b7f-4b28-9e3b-5e4f7d8c6a2b',
    name: '0177',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'ba7e63d3-3b2e-49a8-bc6f-7d2c4a5e8e2c',
    name: '0178',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'fd7c91a1-07e5-4b34-8d3e-5f6a9b7d8c9e',
    name: '0179',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'd3c79d2e-04f7-44b7-9f1d-6c4b7d9e0a3b',
    name: '0180',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'c2d8e0f1-7d4b-4a1c-9c4e-6d5b8f0a1b2c',
    name: '0181',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'f5e2d1c9-9e2a-42b3-9f0d-7c5a6e8b0d1e',
    name: '0182',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'e3d2b1c7-8d9e-4b0a-8c3d-9e6b5a7c8d2f',
    name: '0183',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'a9b8c7d6-5e4f-4d3c-9b2a-8e7d6c5f4a3e',
    name: '0184',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'd4c3b2a1-0e9f-4d8e-9c7b-6a5f4e3d2c1b',
    name: '0185',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: '0f1e2d3c-4b5a-6c7d-8e9f-0a1b2c3d4e5f',
    name: '0186',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'a2b3c4d5-6e7f-8a9b-0c1d-2e3f4a5b6c7d',
    name: '0187',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'b3c4d5e6-7f8a-9b0c-1d2e-3f4a5b6c7d8e',
    name: '0188',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f',
    name: '0189',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'd5e6f7a8-9b0c-1d2e-3f4a-5b6c7d8e9f0a',
    name: '0190',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'e6f7a8b9-0c1d-2e3f-4a5b-6c7d8e9f0a1b',
    name: '0191',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'f7a8b90c-1d2e-3f4a-5b6c-7d8e9f0a1b2c',
    name: '0192',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'a8b90c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d',
    name: '0193',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'b90c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e',
    name: '0194',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'c0d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f',
    name: '0195',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'd1e2f3a4-5b6c-7d8e-9f0a-1b2c3d4e5f6a',
    name: '0196',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'e2f3a4b5-6c7d-8e9f-0a1b-2c3d4e5f6a7b',
    name: '0197',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'f3a4b5c6-7d8e-9f0a-1b2c-3d4e5f6a7b8c',
    name: '0198',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  },
  {
    id: 'a4b5c6d7-8e9f-0a1b-2c3d-4e5f6a7b8c9d',
    name: '0199',
    createdAt: now,
    updatedAt: now,
    status: CondominiumLotStatus.ACTIVE
  }
]

async function seed() {
  await database.prisma.condominiumLot.createMany({
    data: condominiumLotsSeed
  })
  makeLoggerProvider().sendLogInfo({ message: 'Database seeded' })
  await database.prisma.$disconnect()
}

await seed()
