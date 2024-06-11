import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import { LoggerService } from '../logger/logger.service';

const execAsync = promisify(exec);

@Injectable()
export class LiquibaseService {
    constructor(private readonly loggerService: LoggerService) {}

    async runLiquibase(): Promise<void> {
        this.loggerService.log('Running Liquibase migrations...');
        try {
            const { stdout, stderr } = await execAsync('liquibase update');

            if (stdout) {
                this.loggerService.log(`Liquibase stdout: ${stdout}`);
            }

            if (stderr) {
                this.loggerService.error(`Liquibase stderr: ${stderr}`, stderr);
            }

            this.loggerService.log('Liquibase migrations completed successfully.');
        } catch (error) {
            this.loggerService.error('Error running Liquibase migrations', error);
            throw error;
        }
    }
}
