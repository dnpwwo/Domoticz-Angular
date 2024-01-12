export class Scene {
  SceneID: number;
  Name: string;
  Active: boolean;
  constructor(SceneID: number, Name: string, Active: boolean) {
    this.SceneID = SceneID;
    this.Name = Name;
    this.Active = Active;
  }
}

export class SceneMessage {
  Count: number;
  Scene: Scene;
}

export class ScenesMessage {
  Count: number;
  Scenes: Scene[];
}
