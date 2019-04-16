/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import NodeUpdateComponent from '@/entities/node/node-update.vue';
import NodeClass from '@/entities/node/node-update.component';
import NodeService from '@/entities/node/node.service';

const localVue = createLocalVue();
const mockedAxios: any = axios;

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

jest.mock('axios', () => ({
  post: jest.fn(),
  put: jest.fn()
}));

describe('Component Tests', () => {
  describe('Node Management Update Component', () => {
    let wrapper: Wrapper<NodeClass>;
    let comp: NodeClass;

    beforeEach(() => {
      mockedAxios.post.mockReturnValue(Promise.resolve());
      mockedAxios.put.mockReturnValue(Promise.resolve());

      wrapper = shallowMount<NodeClass>(NodeUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          nodeService: () => new NodeService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.node = entity;
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: {} }));

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(mockedAxios.put).toHaveBeenCalledWith('api/nodes', entity);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.node = entity;
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: {} }));

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(mockedAxios.post).toHaveBeenCalledWith('api/nodes', entity);
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
