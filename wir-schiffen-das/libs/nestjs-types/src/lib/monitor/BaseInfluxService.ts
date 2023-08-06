import { Injectable } from '@nestjs/common';
import {InfluxDB, Point} from "@influxdata/influxdb-client";

@Injectable()
export class InfluxDBService {
  // private readonly client: InfluxDBClient;

  constructor() {
    // const token = "IzQ5tp_lAwzfLhDy8kFjBzi8pXwp7Q3FsejhyCsl2_7x5RAbdAJaokal7k6_IAr30kUIrtzzaIcJobq3woYFeg==";
    // const host = 'http://localhost:8086';
    // this.client = new InfluxDBClient({ host, token });
  }

  async writeDataToInfluxDB(time: number, algorithm: string) {
    // const database = `OOKA`;
    // const org = 'HBRS'
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const {InfluxDB} = require('@influxdata/influxdb-client')
    const token = 'IzQ5tp_lAwzfLhDy8kFjBzi8pXwp7Q3FsejhyCsl2_7x5RAbdAJaokal7k6_IAr30kUIrtzzaIcJobq3woYFeg=='
    const org = 'HBRS'
    const bucket = 'Storage'
    const client = new InfluxDB({url: 'http://localhost:8086', token: token})
    const writeApi = client.getWriteApi(org, bucket)
    writeApi.useDefaultTags({host: 'host1'})
    const point = new Point("kafka_check").tag("service", algorithm).intField("execution_time", time);
    try {
      //await this.client.write(point, database);
      // const writeApi = client.getWriteApi(org, bucket)
      writeApi.writePoint(point)
      console.log("Time has been saved to InfluxDB! {time: " + time  + " "  +  algorithm + "}");
    } catch (error) {
      console.log("Fail:  {time: " + time  + " "  +  algorithm + "}");
      console.error("An error occurred during data writing to InfluxDB:");
    } finally {
      //this.client.close();
    }
  }
}
