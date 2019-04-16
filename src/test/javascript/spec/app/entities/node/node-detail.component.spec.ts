/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import NodeDetailComponent from '@/entities/node/node-details.vue';
import NodeClass from '@/entities/node/node-details.component';
import NodeService from '@/entities/node/node.service';

const localVue = createLocalVue();
const mockedAxios: any = axios;

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

jest.mock('axios', () => ({
  get: jest.fn()
}));

describe('Component Tests', () => {
  describe('Node Management Detail Component', () => {
    let wrapper: Wrapper<NodeClass>;
    let comp: NodeClass;

    beforeEach(() => {
      mockedAxios.get.mockReset();
      mockedAxios.get.mockReturnValue(Promise.resolve({}));

      wrapper = shallowMount<NodeClass>(NodeDetailComponent, { store, i18n, localVue, provide: { nodeService: () => new NodeService() } });
      comp = wrapper.vm;
    });

    describe('OnInit', async () => {
      it('Should call load all on init', async () => {
        // GIVEN
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: 123 } }));

        // WHEN
        comp.retrieveNode(123);
        await comp.$nextTick();

        // THEN
        expect(comp.node).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
