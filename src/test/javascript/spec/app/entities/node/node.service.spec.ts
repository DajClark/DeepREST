/* tslint:disable max-line-length */
import axios from 'axios';

import * as config from '@/shared/config/config';
import {} from '@/shared/date/filters';
import NodeService from '@/entities/node/node.service';
import { Node } from '@/shared/model/node.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}));

describe('Service Tests', () => {
  describe('Node Service', () => {
    let service: NodeService;
    let elemDefault;
    beforeEach(() => {
      service = new NodeService();

      elemDefault = new Node(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 0);
    });

    describe('Service methods', async () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should create a Node', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should update a Node', async () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            description: 'BBBBBB',
            ip: 'BBBBBB',
            user: 'BBBBBB',
            password: 'BBBBBB',
            port: 1
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should return a list of Node', async () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            description: 'BBBBBB',
            ip: 'BBBBBB',
            user: 'BBBBBB',
            password: 'BBBBBB',
            port: 1
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        service.retrieve(expected).then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should delete a Node', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        service.delete(123).then(res => {
          expect(res.ok);
        });
      });
    });
  });
});
