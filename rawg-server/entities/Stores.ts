import { Column, Entity, ManyToMany } from "typeorm";
import { Games } from "./Games";

@Entity("stores", { schema: "rawgDatabase" })
export class Stores {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @Column("varchar", { name: "slug", length: 45 })
  slug: string;

  @Column("varchar", { name: "image_background", nullable: true, length: 255 })
  imageBackground: string | null;

  @ManyToMany(() => Games, (games) => games.stores)
  games: Games[];
}
