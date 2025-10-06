import { HealthCheckService } from '@nestjs/terminus';
export declare class HealthController {
    private readonly health;
    constructor(health: HealthCheckService);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
