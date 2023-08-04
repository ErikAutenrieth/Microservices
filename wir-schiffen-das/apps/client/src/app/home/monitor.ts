import {InfluxDBClient, Point} from '@influxdata/influxdb3-client'

// const token = process.env.INFLUXDB_TOKEN

const token = "dkgckgFYuRdgo2F578caXJ72NQQ-7bxpK5Hjlexs_yjmdmDSI2W5ZYjAu5DyjkNdqGDqAJrQG6GTaUPmn8p_Wg=="

async function main() {
  const client = new InfluxDBClient({host: 'https://us-east-1-1.aws.cloud2.influxdata.com', token: token})

  // following code goes here
  const database = `OOKA_Store`

  const points =
    [
      new Point("census")
        .tag("location", "Klamath")
        .intField("bees", 23),
      new Point("census")
        .tag("location", "Portland")
        .intField("ants", 30),
      new Point("census")
        .tag("location", "Klamath")
        .intField("bees", 28),
    ];

  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    await client.write(point, database)
      // separate points by 1 second
      .then(() => new Promise(resolve => setTimeout(resolve, 1000)));
  }


  console.log("Wurde in Monitor gespeichert!")
  client.close()
}

main()
