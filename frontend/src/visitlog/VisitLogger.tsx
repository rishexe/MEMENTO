import { useState, useRef } from "react";
import type { ChangeEvent } from "react";
import { Camera, X, Check, MapPin } from "lucide-react";
import "./VisitLogger.css";

interface Photo {
  id: string;
  url: string;
  file: File;
}

export interface VisitPayload {
  locationName: string;
  date: string;
  memory: string;
  photos: File[];
}

interface VisitLoggerProps {
  locationName?: string;
  locationMeta?: string;
  locationImage?: string;
  onSubmit?: (payload: VisitPayload) => void;
  onCancel?: () => void;
}

const MAX_PHOTOS = 6;
const MAX_MEMORY = 280;

export default function VisitLogger({
  locationName = "Rumtek Monastery",
  locationMeta = "Gangtok • Religious • Monastery",
  locationImage,
  onSubmit,
  onCancel,
}: VisitLoggerProps) {
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState<string>(today);
  const [memory, setMemory] = useState<string>("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handlePhotoSelect(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const room = MAX_PHOTOS - photos.length;
    if (room <= 0) {
      setError(`You can add up to ${MAX_PHOTOS} photos.`);
      return;
    }

    const next: Photo[] = files.slice(0, room).map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()
        .toString(36)
        .slice(2, 7)}`,
      url: URL.createObjectURL(file),
      file,
    }));

    setPhotos((prev) => [...prev, ...next]);
    setError("");
    e.target.value = "";
  }

  function removePhoto(id: string) {
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((p) => p.id !== id);
    });
  }

  function handleLogVisit() {
    if (!date) {
      setError("Pick a date for your visit.");
      return;
    }
    setError("");
    onSubmit?.({
      locationName,
      date,
      memory: memory.trim(),
      photos: photos.map((p) => p.file),
    });
    setSubmitted(true);
  }

  const formattedDate = new Date(date + "T00:00:00").toLocaleDateString(
    "en-US",
    { day: "2-digit", month: "short", year: "numeric" }
  );

  if (submitted) {
    return (
      <div className="visit-logger visit-logger--success">
        <div className="visit-logger__success-content">
          <div className="visit-logger__success-icon">
            <Check size={24} />
          </div>
          <p className="visit-logger__success-title">Visit Logged</p>
          <p className="visit-logger__success-location">{locationName}</p>
          <button
            type="button"
            className="visit-logger__link-btn"
            onClick={() => setSubmitted(false)}
          >
            Log another visit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="visit-logger">
      <div className="visit-logger__card">
        <div className="visit-logger__thumb">
          {locationImage ? (
            <img src={locationImage} alt={locationName} />
          ) : (
            <div className="visit-logger__thumb-placeholder">
              <MapPin size={28} />
            </div>
          )}
        </div>

        <div className="visit-logger__body">
          <p className="visit-logger__eyebrow">LOG YOUR VISIT</p>
          <h2 className="visit-logger__title">{locationName}</h2>
          <p className="visit-logger__meta">{locationMeta}</p>

          <div className="visit-logger__field">
            <label htmlFor="visit-date">DATE OF VISIT</label>
            <input
              id="visit-date"
              type="date"
              value={date}
              max={today}
              onChange={(e) => setDate(e.target.value)}
            />
            <p className="visit-logger__hint">{formattedDate}</p>
          </div>

          <div className="visit-logger__field">
            <label htmlFor="visit-memory">YOUR MEMORY</label>
            <textarea
              id="visit-memory"
              value={memory}
              onChange={(e) =>
                e.target.value.length <= MAX_MEMORY &&
                setMemory(e.target.value)
              }
              rows={3}
              placeholder="A serene Buddhist monastery with beautiful architecture..."
            />
            <p className="visit-logger__char-count">
              {memory.length}/{MAX_MEMORY}
            </p>
          </div>

          <div className="visit-logger__field">
            <label>PHOTOS</label>
            <button
              type="button"
              className="visit-logger__photo-btn"
              onClick={() => fileInputRef.current?.click()}
              disabled={photos.length >= MAX_PHOTOS}
            >
              <Camera size={16} />
              Add photos
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="visit-logger__file-input"
              onChange={handlePhotoSelect}
            />

            {photos.length > 0 && (
              <div className="visit-logger__photo-grid">
                {photos.map((p) => (
                  <div key={p.id} className="visit-logger__photo-thumb">
                    <img src={p.url} alt="" />
                    <button
                      type="button"
                      onClick={() => removePhoto(p.id)}
                      aria-label="Remove photo"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && (
            <p className="visit-logger__error" role="alert">
              {error}
            </p>
          )}

          <div className="visit-logger__actions">
            {onCancel && (
              <button
                type="button"
                className="visit-logger__btn visit-logger__btn--secondary"
                onClick={onCancel}
              >
                Cancel
              </button>
            )}
            <button
              type="button"
              className="visit-logger__btn visit-logger__btn--primary"
              onClick={handleLogVisit}
            >
              Log Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
