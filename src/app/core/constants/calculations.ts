import { PhysicalActivityLevel } from '../../modules/calculations/models/calculations';

export const PHYSIC_LEVELS = [
  {
    value: PhysicalActivityLevel.lowest,
    description: 'Немає фізичних навантажень, сидяча робота',
    icon: 'fa-chair'
  },
  {
    value: PhysicalActivityLevel.low,
    description: 'Виконання невеликих пробіжок або легкої гімнастики 1-3 рази в тиждень',
    icon: 'fa-walking',

  },
  {
    value: PhysicalActivityLevel.medium,
    description: 'Заняття спортом із середніми навантаженнями 3-5 разів на тиждень',
    icon: 'fa-running',
  },
  {
    value: PhysicalActivityLevel.high,
    description: 'Повноцінні тренування 6-7 разів на тиждень',
    icon: 'fa-skating'
  },
  {
    value: PhysicalActivityLevel.highest,
    description: 'Робота пов\'язана з фізичною працею. Тренування 2 рази в день з включання в програму тренувань силових вправ',
    icon: 'fa-dumbbell'
  },
];
