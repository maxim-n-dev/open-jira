interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}


export const seedData: SeedData = {
  entries: [
    {
      description: 'Pending: Proident officia cillum officia pariatur reprehenderit excepteur mollit excepteur qui labore eiusmod.',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description: 'In-Progress: Voluptate amet pariatur labore consectetur voluptate aute consectetur non.',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      description: 'Completed: Aliquip consectetur laborum incididunt culpa.',
      status: 'completed',
      createdAt: Date.now() - 100000,
    },
  ]
}
