import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { format, isBefore, startOfDay } from "date-fns";
import { SupportedLanguage } from "@/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CircleAlert as AlertCircle, CircleCheck as CheckCircle2 } from "lucide-react";

interface BookingFormData {
  date: string;
  time: string;
  partySize: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
}

interface FormErrors {
  [key: string]: string;
}

const timeSlots = [
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
  "21:00", "21:30", "22:00"
];

const partySizes = Array.from({ length: 12 }, (_, i) => i + 1);

export default function BookingPage() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = (lang || "en") as SupportedLanguage;

  const [formData, setFormData] = useState<BookingFormData>({
    date: "",
    time: "",
    partySize: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedData, setConfirmedData] = useState<BookingFormData | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s]?[0-9]{1,4}[-\s]?[0-9]{1,9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.date) {
      newErrors.date = t("booking.validation.dateRequired");
    } else {
      const selectedDate = new Date(formData.date);
      const today = startOfDay(new Date());
      if (isBefore(selectedDate, today)) {
        newErrors.date = t("booking.validation.dateInPast");
      }
    }

    if (!formData.time) {
      newErrors.time = t("booking.validation.timeRequired");
    }

    if (!formData.partySize) {
      newErrors.partySize = t("booking.validation.partySizeRequired");
    } else {
      const size = parseInt(formData.partySize);
      if (size < 1) {
        newErrors.partySize = t("booking.validation.partySizeMin");
      } else if (size > 12) {
        newErrors.partySize = t("booking.validation.partySizeMax");
      }
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = t("booking.validation.firstNameRequired");
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t("booking.validation.lastNameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("booking.validation.emailRequired");
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t("booking.validation.emailInvalid");
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("booking.validation.phoneRequired");
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = t("booking.validation.phoneInvalid");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({
            date: formData.date,
            time: formData.time,
            party_size: parseInt(formData.partySize),
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            special_requests: formData.specialRequests,
            status: "pending",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      setConfirmedData(formData);
      setShowConfirmation(true);

      setFormData({
        date: "",
        time: "",
        partySize: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        specialRequests: "",
      });
    } catch (error) {
      console.error("Booking error:", error);
      setErrors({
        submit: "An error occurred while creating your booking. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const getMinDate = (): string => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative bg-secondary py-20">
        <div className="container">
          <div className="text-center">
            <div className="mx-auto mb-4 h-px w-12 bg-primary" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-secondary-foreground">
              {t("booking.title")}
            </h1>
            <p className="mt-4 font-body text-lg text-secondary-foreground/70 max-w-2xl mx-auto">
              {t("booking.subtitle")}
            </p>
            <div className="mt-4 h-px w-12 mx-auto bg-primary" />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.submit && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.submit}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="font-medium">
                  {t("booking.form.date")}
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={getMinDate()}
                  className={errors.date ? "border-destructive" : ""}
                />
                {errors.date && (
                  <p className="text-sm text-destructive">{errors.date}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="font-medium">
                  {t("booking.form.time")}
                </Label>
                <Select
                  value={formData.time}
                  onValueChange={(value) =>
                    handleSelectChange("time", value)
                  }
                >
                  <SelectTrigger
                    id="time"
                    className={errors.time ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder={t("booking.form.time")} />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.time && (
                  <p className="text-sm text-destructive">{errors.time}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="partySize" className="font-medium">
                  {t("booking.form.partySize")}
                </Label>
                <Select
                  value={formData.partySize}
                  onValueChange={(value) =>
                    handleSelectChange("partySize", value)
                  }
                >
                  <SelectTrigger
                    id="partySize"
                    className={errors.partySize ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder={t("booking.form.partySize")} />
                  </SelectTrigger>
                  <SelectContent>
                    {partySizes.map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size} {currentLang === "en"
                          ? size === 1
                            ? "Guest"
                            : "Guests"
                          : currentLang === "sr"
                          ? size === 1
                            ? "Gost"
                            : "Gostiju"
                          : size === 1
                          ? "Гость"
                          : "Гостей"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.partySize && (
                  <p className="text-sm text-destructive">
                    {errors.partySize}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="font-medium">
                  {t("booking.form.firstName")}
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? "border-destructive" : ""}
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="font-medium">
                  {t("booking.form.lastName")}
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? "border-destructive" : ""}
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium">
                  {t("booking.form.email")}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="font-medium">
                  {t("booking.form.phone")}
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequests" className="font-medium">
                {t("booking.form.specialRequests")}
              </Label>
              <Textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                placeholder={
                  currentLang === "en"
                    ? "Any dietary requirements, allergies, or special occasions?"
                    : currentLang === "sr"
                    ? "Postojeći dijetalni zahtevi, alergije ili posebne prilike?"
                    : "Какие-либо особенности диеты, аллергии или особые случаи?"
                }
                rows={4}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 text-base"
            >
              {isSubmitting
                ? t("booking.form.submitting")
                : t("booking.form.submit")}
            </Button>
          </form>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container max-w-3xl">
          <div className="mx-auto mb-6 h-px w-12 bg-primary" />
          <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground text-center mb-6">
            {t("booking.ourStory.title")}
          </h3>
          <p className="font-body text-center text-muted-foreground mb-8 leading-relaxed">
            {t("booking.ourStory.description")}
          </p>
          <div className="flex justify-center">
            <Link to={`/${currentLang}/about`}>
              <Button variant="outline">
                {t("booking.ourStory.learnMore")}
              </Button>
            </Link>
          </div>
          <div className="mt-6 h-px w-12 mx-auto bg-primary" />
        </div>
      </section>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <DialogTitle className="text-center text-2xl">
              {t("booking.confirmation.title")}
            </DialogTitle>
          </DialogHeader>

          {confirmedData && (
            <div className="space-y-4">
              <p className="text-center text-muted-foreground">
                {t("booking.confirmation.message", {
                  date: format(new Date(confirmedData.date), "MMM dd, yyyy"),
                  time: confirmedData.time,
                })}
              </p>

              <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
                <h4 className="font-semibold text-foreground text-center mb-3">
                  {t("booking.confirmation.bookingDetails")}
                </h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("booking.confirmation.date")}:
                    </span>
                    <span className="font-medium">
                      {format(new Date(confirmedData.date), "MMM dd, yyyy")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("booking.confirmation.time")}:
                    </span>
                    <span className="font-medium">{confirmedData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("booking.confirmation.party")}:
                    </span>
                    <span className="font-medium">
                      {confirmedData.partySize}{" "}
                      {currentLang === "en"
                        ? confirmedData.partySize === "1"
                          ? "Guest"
                          : "Guests"
                        : currentLang === "sr"
                        ? confirmedData.partySize === "1"
                          ? "Gost"
                          : "Gostiju"
                        : confirmedData.partySize === "1"
                        ? "Гость"
                        : "Гостей"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("booking.confirmation.name")}:
                    </span>
                    <span className="font-medium">
                      {confirmedData.firstName} {confirmedData.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("booking.confirmation.email")}:
                    </span>
                    <span className="font-medium">{confirmedData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("booking.confirmation.phone")}:
                    </span>
                    <span className="font-medium">{confirmedData.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              onClick={() => setShowConfirmation(false)}
              className="w-full"
            >
              {t("booking.confirmation.close")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
