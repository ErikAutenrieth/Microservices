import { Injectable } from '@nestjs/common';
import {
    InitializeAlgorithmMicroserviceDto,
    UpdateAlgorithmStateDto
} from '@wir-schiffen-das/types';
import { AlgorithmStateDocument, BaseDatabaseServer } from '@wir-schiffen-das/nestjs-types';

@Injectable()
export abstract class AbstractAppService {

    constructor(protected baseDatabase: BaseDatabaseServer) { }

    // Update the algorithm state for a specific database entry
    updateAlgorithmState(dbEntryID: string, updatedPart: UpdateAlgorithmStateDto) {
        return this.baseDatabase.update(dbEntryID, updatedPart);
    }

    // Retrieve the algorithm state for a specific user
    async getAlgorithmStateForUser(userID: string): Promise<AlgorithmStateDocument | null> {
        return await this.baseDatabase.findByUserId(userID);
    }

    /**
     * Check the compatibility of algorithm configurations.
     * @param initializeAlgorithmMicroserviceDto The DTO containing the algorithm configurations.
     * @returns A promise representing the incompatible component sets.
     */
    abstract checkCompactibility(initializeAlgorithmMicroserviceDto: InitializeAlgorithmMicroserviceDto): Promise<any[]>


}

