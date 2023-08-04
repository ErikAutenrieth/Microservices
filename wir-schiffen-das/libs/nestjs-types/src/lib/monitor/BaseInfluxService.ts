import { Injectable } from '@nestjs/common';
import { InfluxDBClient, Point } from '@influxdata/influxdb3-client';

@Injectable()
export class InfluxDBService {
  private readonly client: InfluxDBClient;

  constructor() {
    const token = "dkgckgFYuRdgo2F578caXJ72NQQ-7bxpK5Hjlexs_yjmdmDSI2W5ZYjAu5DyjkNdqGDqAJrQG6GTaUPmn8p_Wg==";
    const host = 'https://us-east-1-1.aws.cloud2.influxdata.com';
    this.client = new InfluxDBClient({ host, token });
  }

  async writeDataToInfluxDB(time: number, algorithm: string) {
    const database = `OOKA_Store`;
    const points = [new Point("kafka_check").tag("service", algorithm).intField("execution_time", time)];

    for (const point of points) {
      await this.client.write(point, database);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log("Time has been saved to InfluxDB! {time: " + time  + " "  +  algorithm + "}");
    this.client.close();
  }
}
