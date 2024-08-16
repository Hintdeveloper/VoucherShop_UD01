import { createContext, useState, PropsWithChildren, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import gameshiftService from '../gameshift.service';

interface AuthContextType {
  isAuthenticated: boolean;
  email: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const router = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const res = await gameshiftService.fetchUser(email);
      if (res && res.status == 200) {
        setEmail(email);
        setIsAuthenticated(true);
        router('/list');
      }
    } catch (error: any) {        
      const res = await gameshiftService.createUser(email);
      if (res && res.status === 201) {
        setEmail(email);
        setIsAuthenticated(true);
        router('/list');
      }
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setEmail(null);
    router('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
