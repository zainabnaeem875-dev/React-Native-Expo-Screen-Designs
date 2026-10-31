import React, { createContext, useContext, useState } from 'react';

export type Sticker = {
  id: string;
  name: string;
  category: string;
  creator: string;
  emoji: string;
  color: string;
};

type FavoritesContextType = {
  favorites: Sticker[];
  toggleFavorite: (sticker: Sticker) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favorites, setFavorites] = useState<Sticker[]>([]);

  const toggleFavorite = (sticker: Sticker) => {
    setFavorites((previous) => {
      const alreadyFavorite = previous.some((item) => item.id === sticker.id);

      if (alreadyFavorite) {
        return previous.filter((item) => item.id !== sticker.id);
      }

      return [...previous, sticker];
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }

  return context;
}
