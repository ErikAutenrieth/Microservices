// import {
//   AlgorithmStateEnum,
//   components_failure,
//   DevMicroserviceAddressEnum,
//   ReturnAlgorithmStateDto
// } from "../../../libs/types/src";
// import {environment} from "../../client/src/environments/environment";
//
// checkIncompatibleComponents(comp: number): boolean {
//   if (this.incompatible_components && this.incompatible_components?.length === 0) {
//     return false;
//   }
//   for (let i = 0; i < components_failure.length; i++) {
//     if (comp === i && this.incompatible_components?.includes(Object.values(components_failure[i])[0])) {
//       return true;
//     }
//   }
//   return false;
// }
//
// /**
//  * Set the status of the algorithm states.
//  */
// setStatus() {
//   // Reset all algorithm states to undefined
//   Object.keys(this.algorithmStates).forEach(key => this.algorithmStates[key] = undefined);
//   // Iterate through each algorithm and check its state
//   for (const [algorithm, state] of Object.entries(this.algorithmStates)) {
//     // Get the microservice URL for the algorithm
//     const microservice: DevMicroserviceAddressEnum = environment.APIUrls[algorithm as keyof typeof DevMicroserviceAddressEnum];
//     // Call the engine service to check the algorithm state
//     this.engineService.checkAlgorithmState(
//       { userID: this.sessionID }, microservice)
//       .subscribe(
//         {
//           next: (res: ReturnAlgorithmStateDto) => {
//             // Update the algorithm state
//             this.algorithmStates[algorithm] = res.algorithmState
//             if (res.algorithmState === AlgorithmStateEnum.failed && res.incompatibleComponents !== undefined) {
//               console.log("raw ", res.incompatibleComponents);
//               this.incompatible_components = Array.from(new Set(this.incompatible_components.concat(res.incompatibleComponents)));
//               console.log("updated incompactibilities ", res.incompatibleComponents);
//             }
//
//             this.checkStates();
//             this.checkResult();
//           },
//           error: (err) => {
//             this.algorithmStates[algorithm] = UIAlgorithmStateEnum.unresponsive
//
//             console.log(err, algorithm)
//           }
//         });
//   }
//   this.checkStates();
//   this.checkResult();
// }


// checkReady = (): string => (this.selectedCount() === 12) ? "ready" : "not ready";
//   incompatible_components: (DieselEngineEnum | StartingSystemEnum | AuxiliaryPtoEnum | OilSystemEnum | FuelSystemEnum | CoolingSystemEnum | ExhaustSystemEnum | MountingSystemEnum | EngineManagementSystemEnum | MonitoringSystems | PowerTransmission | GearBoxOptions)[] | undefined  = [];


// import {
//   AlgorithmStateEnum,
//   CheckAlgorithmStateDto,
//   DevMicroserviceAddressEnum,
//   ReturnAlgorithmStateDto
// } from "../../../libs/types/src";
// import {distinctUntilChanged, interval, Observable, retry, switchMap, takeWhile} from "rxjs";
//
// /**
//  * Checks the algorithm state by sending periodic HTTP POST requests to the specified microservice.
//  *
//  * @param checkAlgorithmStateDto - The data object containing the algorithm state information to be checked.
//  * @param microservice - The enum value representing the address of the microservice to send the requests to.
//  * @returns An Observable emitting the algorithm state information wrapped in a ReturnAlgorithmStateDto.
//  */
// checkAlgorithmState(checkAlgorithmStateDto: CheckAlgorithmStateDto, microservice: DevMicroserviceAddressEnum): Observable<ReturnAlgorithmStateDto> {
//   return interval(3000) // Emits a value every 3000 milliseconds (3 seconds)
//     .pipe(
//       // Makes an HTTP POST request to check the algorithm state
//       switchMap(() => this.http.post<ReturnAlgorithmStateDto>(microservice + "status", checkAlgorithmStateDto)),
//       retry({ delay: 3000, count: 5, resetOnSuccess: true }), // Retries the HTTP POST request up to 5 times with a 3 seconds delay between retries
//       distinctUntilChanged(), // Emits only distinct algorithm states
//       // Emits values until the algorithm state is either "ready" or "failed"
//       takeWhile(res => (res.algorithmState !== AlgorithmStateEnum.ready) && (res.algorithmState !== AlgorithmStateEnum.failed), true)
//     );
// }
