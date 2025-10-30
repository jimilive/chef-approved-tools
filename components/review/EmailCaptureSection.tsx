interface EmailCaptureSectionProps {
  title: string
  subtitle: string
  inputPlaceholder?: string
  buttonText?: string
  finePrint: string
}

export default function EmailCaptureSection({
  title,
  subtitle,
  inputPlaceholder = "Enter your email",
  buttonText = "Get Free Guide",
  finePrint
}: EmailCaptureSectionProps) {
  return (
    <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl px-6 pt-8 pb-8 md:px-12 shadow-lg mb-6 text-center">
      <h3 className="text-2xl font-bold text-white mb-3 mt-0">
        {title}
      </h3>
      <p className="text-purple-100 text-base mb-6 max-w-2xl mx-auto">
        {subtitle}
      </p>
      <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
        <input
          type="email"
          placeholder={inputPlaceholder}
          className="flex-1 px-5 py-3 rounded-lg text-base border-0 focus:ring-2 focus:ring-purple-300 outline-none"
        />
        <button
          type="submit"
          className="bg-white text-purple-700 font-semibold px-8 py-3 rounded-lg text-base hover:bg-purple-50 transition-all whitespace-nowrap"
        >
          {buttonText}
        </button>
      </form>
      <p className="text-purple-200 text-sm mt-4">
        {finePrint}
      </p>
    </div>
  )
}
