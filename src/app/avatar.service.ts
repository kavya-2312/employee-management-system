import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(private http:HttpClient) { }

  getAvatar(name: string): string {
    const initials = name
      .split(' ')
      .map(word => word[0]?.toUpperCase())
      .join('');
    return `https://ui-avatars.com/api/?name=${initials}&background=random&size=128&rounded=true`;
  }
}
