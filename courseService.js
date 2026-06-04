// Ni-versity Central Course Database
// In production, this syncs directly with Firebase Cloud Firestore

// The Master Course Collection (Starting with 2 real courses instead of 24 fake ones)
let courseCollection = [
  { id: 'c1', title: 'Introduction to Vocal Mixing', instructor: 'Instructor B', price: 25, students: 12 },
  { id: 'c2', title: 'Advanced Guitar Chords', instructor: 'Instructor B', price: 40, students: 8 }
];

export const CourseService = {
  
  /**
   * 🎓 STUDENT HUB: Fetch all live courses for the catalog
   */
  getAllCourses: async () => {
    // Simulating secure network fetch from Firebase
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Return courses with the newest uploads at the top
    return [...courseCollection].reverse(); 
  },

  /**
   * 👨‍🏫 TEACHER HUB: Publish a new course to the live platform
   */
  publishCourse: async (title, price, instructorName) => {
    // Simulating database write delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newCourse = {
      id: `c${Date.now()}`,
      title: title,
      instructor: instructorName,
      price: Number(price),
      students: 0
    };

    // Push to the master database
    courseCollection.push(newCourse);
    
    return newCourse;
  }
};
