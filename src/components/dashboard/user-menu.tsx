'use client';

import { useMemo } from 'react';
import { LogOut, Settings, User as UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCurrentUser } from '@/app/hooks/use-current-user';
import { Button } from '@/components/ui/button';
import { createAvatar } from '@dicebear/core';
import { funEmoji } from '@dicebear/collection';

function getInitials(email?: string) {
  if (!email) return '?';
  return email.charAt(0).toUpperCase();
}

export function UserMenu() {
  const { user } = useCurrentUser();
  const seed = user?.email || 'guest-' + Math.random();

  // Generate unique avatar for each user
  const avatarSvg = useMemo(() => {
    return createAvatar(funEmoji, {
      seed,
      backgroundColor: ['fde047', 'bbf7d0', 'bfdbfe', 'fbcfe8'],
      radius: 50,
      size: 128,
    }).toString();
  }, [seed]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      window.location.href = '/login';
    } catch {
      // swallow error
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="Open user menu"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={`data:image/svg+xml;utf8,${encodeURIComponent(avatarSvg)}`}
            />
            <AvatarFallback>{getInitials(user?.email)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Account</span>
            <span className="text-xs text-muted-foreground truncate">
              {user?.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="/settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Account settings</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem disabled={!user}>
          <UserIcon className="h-4 w-4 mr-2" />
          <span>Profile (comming soon)</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-destructive">
          <LogOut className="h-4 w-4 mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
