import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SceneService {

  constructor(private httpClient: HttpClient) { }

  getScenes() {
    return this.httpClient.get(environment.API_URL + 'Scenes')
  }

  getScene(SceneId) {
    return this.httpClient.get(`${environment.API_URL + 'Scenes'}/${SceneId}`);
  }

  createScene(Scene) {
    return this.httpClient.post(`${environment.API_URL + 'Scenes'}`, `${Scene}`);
  }

  updateScene(SceneId, Scene) {
    return this.httpClient.post(`${environment.API_URL + 'Scenes'}/${SceneId}`, `${Scene}`);
  }

  deleteScene(SceneId) {
    return this.httpClient.delete(`${environment.API_URL + 'Scenes'}/${SceneId}`);
  }
}
