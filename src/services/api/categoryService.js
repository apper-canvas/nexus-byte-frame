import categoriesData from "@/services/mockData/categories.json";

class CategoryService {
  constructor() {
    this.categories = [...categoriesData];
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.categories]);
      }, 200);
    });
  }

  async updateCategory(categoryId, updates) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const categoryIndex = this.categories.findIndex(c => c.Id === parseInt(categoryId));
        if (categoryIndex !== -1) {
          this.categories[categoryIndex] = {
            ...this.categories[categoryIndex],
            ...updates
          };
          resolve({ ...this.categories[categoryIndex] });
        } else {
          reject(new Error("Category not found"));
        }
      }, 100);
    });
  }

  async toggleExpanded(categoryId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const categoryIndex = this.categories.findIndex(c => c.Id === parseInt(categoryId));
        if (categoryIndex !== -1) {
          this.categories[categoryIndex].isExpanded = !this.categories[categoryIndex].isExpanded;
          resolve({ ...this.categories[categoryIndex] });
        } else {
          reject(new Error("Category not found"));
        }
      }, 100);
    });
  }

  async toggleSelected(categoryId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const categoryIndex = this.categories.findIndex(c => c.Id === parseInt(categoryId));
        if (categoryIndex !== -1) {
          this.categories[categoryIndex].isSelected = !this.categories[categoryIndex].isSelected;
          resolve({ ...this.categories[categoryIndex] });
        } else {
          reject(new Error("Category not found"));
        }
      }, 100);
    });
  }

  async clearAllSelections() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.categories = this.categories.map(category => ({
          ...category,
          isSelected: false
        }));
        resolve([...this.categories]);
      }, 150);
    });
  }

  async getSelectedCategories() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const selected = this.categories.filter(c => c.isSelected);
        resolve(selected);
      }, 100);
    });
  }
}

export default new CategoryService();