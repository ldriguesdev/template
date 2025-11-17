export interface RefreshTokenData {
  id: string;
  hashed_token: string;
  userId: string;
  expires_at: Date;
}

export abstract class RefreshTokenRepository {
  abstract create(
    data: Omit<RefreshTokenData, 'id'>,
  ): Promise<RefreshTokenData>;
  abstract findByHashedToken(
    hashed_token: string,
  ): Promise<RefreshTokenData | null>;
  abstract delete(id: string): Promise<void>;
  abstract deleteByUserId(userId: string): Promise<void>;
}
