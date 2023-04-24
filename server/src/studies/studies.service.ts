import { Injectable } from "@nestjs/common";
import { Mark } from "src/marks/entities/mark.entity";
import { MarksRepository } from "src/marks/marks.repository";
import { User } from "src/users/entities/users.entity";

/**  convert map to JS object */
function toObject(map: Map<string, any>) {
  return Object.fromEntries(
    Array.from(map.entries(), ([k, v]) =>
      v instanceof Map ? [k, toObject(v)] : [k, v],
    ),
  );
}

@Injectable()
export class StudiesService {
  constructor(private readonly marksRepository: MarksRepository) {}

  async listStudies(user: User) {
    const marks = await this.marksRepository.find({
      loadEagerRelations: false,
      where: {
        user,
      },
      relations: {
        subject: true,
        user: true,
      },
    });
    /*
    Create map / tree like: 
    {
      "2022": {
        "0": [ // 0 is FALL
          {
            "subject": "Programming II.", // not entirely
            "mark": 3
          }
        ]
      },
      "2023": {
        "1": [ // ' is SPRING
          {
            "subject": "Database Systems",
            "mark": 5
          }
        ]
      }
    }
    */
    const data = new Map<string, Map<string, Mark[]>>();
    for (const mark of marks) {
      let map = data.get(mark.year.toString());
      if (map == null) {
        map = new Map<string, Mark[]>();
      }
      let array = map.get(mark.semester.toString());
      if (array == null) {
        array = [];
      }
      array.push(mark);
      map.set(mark.semester.toString(), array);
      data.set(mark.year.toString(), map);
    }
    return toObject(data);
  }
}
