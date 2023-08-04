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
    const point = new Point("kafka_check").tag("service", algorithm).intField("execution_time", time);
    //await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      await this.client.write(point, database);
      console.log("Time has been saved to InfluxDB! {time: " + time  + " "  +  algorithm + "}");
    } catch (error) {
      console.log("Fail:  {time: " + time  + " "  +  algorithm + "}");
      console.error("An error occurred during data writing to InfluxDB:");
    } finally {
      //this.client.close();
    }
  }
}
