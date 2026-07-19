import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  BookOpen,
  Loader2,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useLessons } from "../../context/LessonsContext";
import { createLesson, deleteLesson, updateLesson } from "../../services/api";
import type { Lesson, SaveLessonInput } from "../../types";
import { ThemeToggle } from "../ui/ThemeToggle";

interface AdminPageProps {
  onClose: () => void;
}

const emptyLesson: SaveLessonInput = {
  title: { en: "", so: "" },
  description: { en: "", so: "" },
  content: { en: "", so: "" },
  diagram: "repo",
  objectives: { en: [], so: [] },
  commands: [],
  sortOrder: 1,
  isPublished: true,
};

function toForm(lesson: Lesson): SaveLessonInput {
  return {
    title: lesson.title,
    description: lesson.description,
    content: lesson.content,
    diagram: lesson.diagram,
    objectives: lesson.objectives,
    commands: lesson.commands,
    sortOrder: lesson.id,
    isPublished: true,
  };
}

export function AdminPage({ onClose }: AdminPageProps) {
  const { lessons, reload } = useLessons();
  const [selectedId, setSelectedId] = useState<number | null>(lessons[0]?.id ?? null);
  const selected = useMemo(
    () => lessons.find((lesson) => lesson.id === selectedId) ?? null,
    [lessons, selectedId]
  );
  const [form, setForm] = useState<SaveLessonInput>(
    selected ? toForm(selected) : emptyLesson
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setForm(selected ? toForm(selected) : {
      ...emptyLesson,
      sortOrder: lessons.length + 1,
    });
    setMessage("");
  }, [selected, lessons.length]);

  const save = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      if (selected) {
        await updateLesson(selected.id, form);
      } else {
        const created = await createLesson(form);
        setSelectedId(created.id);
      }
      await reload();
      setMessage("Lesson saved successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save lesson.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!selected || !window.confirm(`Delete "${selected.title.en}"?`)) return;
    setSaving(true);
    try {
      await deleteLesson(selected.id);
      setSelectedId(null);
      await reload();
      setMessage("Lesson deleted.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not delete lesson.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-white">
      <header className="h-16 flex items-center justify-between px-4 lg:px-6 border-b border-glass-border bg-surface-raised">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10" title="Back">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-semibold">Lesson administration</h1>
            <p className="text-xs text-white/40">Create and maintain course content</p>
          </div>
        </div>
        <button
          onClick={() => setSelectedId(null)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent text-on-accent text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> New lesson
        </button>
        <ThemeToggle />
      </header>

      <div className="grid lg:grid-cols-[280px_minmax(0,1fr)] min-h-[calc(100vh-4rem)]">
        <aside className="border-r border-glass-border p-3 bg-surface-raised/60 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <p className="px-3 py-2 text-xs uppercase text-white/35">Lessons</p>
          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => setSelectedId(lesson.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm ${
                selectedId === lesson.id
                  ? "bg-accent/20 border border-accent/35 text-white"
                  : "border border-transparent text-white/55 hover:bg-white/5"
              }`}
            >
              <span className="w-7 h-7 grid place-items-center rounded-md bg-white/5 text-xs">
                {lesson.id}
              </span>
              <span className="truncate">{lesson.title.en}</span>
            </button>
          ))}
        </aside>

        <main className="p-4 lg:p-7 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <form onSubmit={save} className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-glass-border pb-4">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-accent-glow" />
                <h2 className="text-lg font-semibold">
                  {selected ? `Edit lesson ${selected.id}` : "New lesson"}
                </h2>
              </div>
              <div className="flex gap-2">
                {selected && (
                  <button
                    type="button"
                    onClick={remove}
                    disabled={saving}
                    className="p-2.5 rounded-lg border border-red-500/25 text-red-300 hover:bg-red-500/10"
                    title="Delete lesson"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-on-accent font-medium text-sm"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <TextField label="English title" value={form.title.en} onChange={(value) => setForm({ ...form, title: { ...form.title, en: value } })} />
              <TextField label="Somali title" value={form.title.so} onChange={(value) => setForm({ ...form, title: { ...form.title, so: value } })} />
              <TextField label="English description" value={form.description.en} onChange={(value) => setForm({ ...form, description: { ...form.description, en: value } })} />
              <TextField label="Somali description" value={form.description.so} onChange={(value) => setForm({ ...form, description: { ...form.description, so: value } })} />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <TextArea label="English content" rows={12} value={form.content.en} onChange={(value) => setForm({ ...form, content: { ...form.content, en: value } })} />
              <TextArea label="Somali content" rows={12} value={form.content.so} onChange={(value) => setForm({ ...form, content: { ...form.content, so: value } })} />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <TextArea label="English objectives (one per line)" rows={5} value={form.objectives.en.join("\n")} onChange={(value) => setForm({ ...form, objectives: { ...form.objectives, en: lines(value) } })} />
              <TextArea label="Somali objectives (one per line)" rows={5} value={form.objectives.so.join("\n")} onChange={(value) => setForm({ ...form, objectives: { ...form.objectives, so: lines(value) } })} />
              <TextArea label="Commands (one per line)" rows={5} value={form.commands.join("\n")} onChange={(value) => setForm({ ...form, commands: lines(value) })} />
              <div className="grid grid-cols-2 gap-4 content-start">
                <TextField label="Diagram" value={form.diagram} onChange={(value) => setForm({ ...form, diagram: value })} />
                <label className="block">
                  <span className="block text-xs text-white/50 mb-1.5">Sort order</span>
                  <input type="number" min={1} value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} className={inputClass} />
                </label>
                <label className="col-span-2 flex items-center gap-2 text-sm text-white/65">
                  <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} />
                  Published
                </label>
              </div>
            </div>

            {message && <p className="text-sm text-white/60 border-t border-glass-border pt-4">{message}</p>}
          </form>
        </main>
      </div>
    </div>
  );
}

const inputClass =
  "w-full px-3 py-2.5 rounded-lg bg-black/25 border border-glass-border outline-none focus:border-accent/60 text-sm";

function lines(value: string) {
  return value.split("\n").map((line) => line.trim()).filter(Boolean);
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="block text-xs text-white/50 mb-1.5">{label}</span>
      <input required value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
    </label>
  );
}

function TextArea({ label, value, rows, onChange }: { label: string; value: string; rows: number; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="block text-xs text-white/50 mb-1.5">{label}</span>
      <textarea required rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className={`${inputClass} resize-y font-mono leading-relaxed`} />
    </label>
  );
}
