/*
// Create a microservice DTO with the algorithm state document's ID
const microServiceDto: InitializeAlgorithmMicroserviceDto = {
  ...algorithmStateDto,
  ...{ dbId: algotithmStateDoc._id.toString() },
};
// Send the configuration to all microservices
for (const microserviceAddressEnum in this.apiUrls) {
  //TODO implement circuit breaker and return success to client
  const res = await this.appService.sendConfigurationToService(
    microServiceDto,
    this.apiUrls[microserviceAddressEnum]
  );
  // console.log('finished sending configuration to engine', res);
}
*/


// Anchor Service

// import {DevMicroserviceAddressEnum, InitializeAlgorithmMicroserviceDto} from "../../../libs/types/src";
// import {firstValueFrom} from "rxjs";
//
// /**
//  * Sends the configuration to a specific microservice.
//  *
//  * @param initializeAlgorithmMicroserviceDto - The data object containing the configuration to be sent.
//  * @param microserviceAddressEnum - The enum value representing the address of the microservice.
//  * @returns A Promise resolving to the result of the HTTP request.
//  */
// async sendConfigurationToService(
//   initializeAlgorithmMicroserviceDto: InitializeAlgorithmMicroserviceDto,
//   devMicroserviceAddressEnum: DevMicroserviceAddressEnum
// ): Promise<any> {
//   return await firstValueFrom(
//     this.httpService.post(
//       devMicroserviceAddressEnum + 'CheckConfiguration',
//       initializeAlgorithmMicroserviceDto
//     )
//   );
//   // const apiCall = async () => await firstValueFrom(this.httpService.post( microserviceAddressEnum + "CheckConfiguration", initializeAlgorithmMicroserviceDto ));
//
//   // const breaker = new CircuitBreaker(apiCall, this.circuitBreakerOptions);
//   // breaker.fire()
//   //   .then(console.log)
//   //  .catch(console.error);
// }


// // @InjectModel(AlgorithmState.name) private algorithmState: Model<AlgorithmStateDocument>,
