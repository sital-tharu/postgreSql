import { SupabaseAuthGuard } from './supabase-auth.guard';
import { ConfigService } from '@nestjs/config';

describe('SupabaseAuthGuard', () => {
  let guard: SupabaseAuthGuard;
  let configService: ConfigService;

  beforeEach(() => {
    configService = new ConfigService();
    guard = new SupabaseAuthGuard(configService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
