import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Student, SubjectProgress, LessonProgress } from '@/types';
import { mockStudent, mockProgress, mockRecentActivities } from '@/lib/mockData';

interface StudentStore {
  student: Student | null;
  progress: SubjectProgress[];
  recentActivities: LessonProgress[];
  setStudent: (student: Student) => void;
  updateProgress: (subjectProgress: SubjectProgress) => void;
  addActivity: (activity: LessonProgress) => void;
  addPearls: (amount: number) => void;
}

export const useStudentData = create<StudentStore>()(
  persist(
    (set, get) => ({
      student: mockStudent,
      progress: mockProgress,
      recentActivities: mockRecentActivities,
      
      setStudent: (student) => set({ student }),
      
      updateProgress: (subjectProgress) => set((state) => ({
        progress: state.progress.map((p) =>
          p.subject === subjectProgress.subject ? subjectProgress : p
        ),
      })),
      
      addActivity: (activity) => set((state) => ({
        recentActivities: [activity, ...state.recentActivities].slice(0, 10),
      })),
      
      addPearls: (amount) => set((state) => ({
        student: state.student
          ? { ...state.student, pearlPoints: state.student.pearlPoints + amount }
          : null,
      })),
    }),
    {
      name: 'bahrain-learn-student',
    }
  )
);
