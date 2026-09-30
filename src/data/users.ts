export interface UserCredentials {
  username: string;
  password: string;
}

// Credenciales públicas del sitio de práctica Sauce Demo (indicadas en el reto).
const PASSWORD = process.env.SAUCE_PASSWORD ?? 'secret_sauce';

export const USERS: Record<string, UserCredentials> = {
  standard_user: { username: 'standard_user', password: PASSWORD },
  locked_out_user: { username: 'locked_out_user', password: PASSWORD },
};

export function getUser(username: string): UserCredentials {
  const user = USERS[username];
  if (!user) {
    throw new Error(`Usuario "${username}" no definido en src/data/users.ts`);
  }
  return user;
}
