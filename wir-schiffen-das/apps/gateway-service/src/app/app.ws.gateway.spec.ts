import { Test, TestingModule } from '@nestjs/testing';
import { WsAdapter } from '@nestjs/platform-ws';
import { WSGateway } from './app.ws.gateway';
import { AppService } from './app.service';

describe('WSGateway', () => {
  let gateway: WSGateway;
  let appService: AppService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [WSGateway, AppService],
    }).compile();

    gateway = module.get<WSGateway>(WSGateway);
    appService = module.get<AppService>(AppService);
    gateway.server = new WsAdapter().create(gateway, module);
  });

  it('should handle "AlgorithmStates" message', (done) => {
    const client = { send: jest.fn() };
    const data = 'test data';

    jest.spyOn(appService.kafkaSubject, 'pipe').mockReturnValue({
      subscribe: (callback) => {
        callback({ value: data });
        expect(client.send).toHaveBeenCalledWith(JSON.stringify(data));
        done();
      },
    });

    gateway.handleMessage(client, data);
  });
});