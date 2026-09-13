const colors = {
  graphite: "#0E1113",
  graphiteSoft: "#171B1D",
  border: "#22282B",
  text: "#E7EAEA",
  muted: "#8A9295",
  signalTeal: "#3FC7B0",
} as const;

export const theme = {
  brand: {
    name: "Portfolio",
    colors,
  },

  typography: {
    fontFamily: {
      sans: "var(--font-plex-sans)",
      mono: "var(--font-plex-mono)",
    },

    heading: {
      display: {
        xs: { fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.08, fontWeight: 300, letterSpacing: "-0.035em" },
        sm: { fontSize: "clamp(2.5rem, 6vw, 4rem)", lineHeight: 1.05, fontWeight: 300, letterSpacing: "-0.04em" },
        md: { fontSize: "clamp(3rem, 7vw, 5rem)", lineHeight: 1, fontWeight: 300, letterSpacing: "-0.045em" },
        lg: { fontSize: "clamp(3.5rem, 8vw, 6rem)", lineHeight: 0.98, fontWeight: 300, letterSpacing: "-0.05em" },
        xl: { fontSize: "clamp(4rem, 9vw, 7rem)", lineHeight: 0.96, fontWeight: 300, letterSpacing: "-0.055em" },
        xxl: { fontSize: "clamp(4.5rem, 10vw, 8rem)", lineHeight: 0.94, fontWeight: 300, letterSpacing: "-0.06em" },
      },

      section: { fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05, fontWeight: 300, letterSpacing: "-0.035em" },
      page: { fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1, fontWeight: 300, letterSpacing: "-0.045em" },
      card: { fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1.1, fontWeight: 300, letterSpacing: "-0.025em" },
      small: { fontSize: "1.125rem", lineHeight: 1.3, fontWeight: 400, letterSpacing: "-0.01em" },
    },

    body: {
      large: { fontSize: "clamp(1.125rem, 1.8vw, 1.375rem)", lineHeight: 1.7, fontWeight: 400 },
      medium: { fontSize: "1rem", lineHeight: 1.7, fontWeight: 400 },
      small: { fontSize: "0.875rem", lineHeight: 1.6, fontWeight: 400 },
      xs: { fontSize: "0.75rem", lineHeight: 1.5, fontWeight: 400 },
    },

    label: {
      fontFamily: "var(--font-plex-mono)",
      fontSize: "0.75rem",
      lineHeight: 1.4,
      fontWeight: 400,
      letterSpacing: "0.015em",
      textTransform: "none",
      color: colors.signalTeal,
    },

    editorial: {
      emphasis: {
        fontFamily: "var(--font-plex-sans)",
        fontSize: "inherit",
        lineHeight: "inherit",
        fontWeight: 300,
        fontStyle: "italic",
        letterSpacing: "-0.015em",
      },
      subtle: {
        color: colors.muted,
        fontWeight: 300,
        fontStyle: "italic",
      },
    },

    technical: {
      fontFamily: "var(--font-plex-mono)",
      fontSize: "0.75rem",
      lineHeight: 1.5,
      fontWeight: 400,
      letterSpacing: "0",
    },

    code: {
      fontFamily: "var(--font-plex-mono)",
      fontSize: "0.8125rem",
      lineHeight: 1.65,
      fontWeight: 400,
    },
  },

  spacing: {
    0: "0", 1: "0.25rem", 2: "0.5rem", 3: "0.75rem", 4: "1rem", 5: "1.25rem",
    6: "1.5rem", 8: "2rem", 10: "2.5rem", 12: "3rem", 16: "4rem", 20: "5rem",
    24: "6rem", 32: "8rem", 40: "10rem", 48: "12rem",
  },

  breakpoints: {
    mobile: "320px",
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    xxl: "1440px",
  },

  layout: {
    maxWidth: {
      content: "1200px",
      contentWide: "1400px",
      reading: "680px",
      text: "760px",
      narrow: "560px",
      prose: "720px",
    },

    pagePadding: { mobile: "1rem", sm: "1.5rem", md: "2rem", lg: "3rem", xl: "4rem", xxl: "5rem" },
    sectionSpacing: { mobile: "4rem", sm: "5rem", md: "6rem", lg: "8rem", xl: "10rem", xxl: "12rem" },
    headerHeight: { mobile: "4rem", md: "4.5rem", lg: "5rem" },
  },

  radius: {
    none: "0", xs: "4px", sm: "6px", md: "8px", lg: "12px", xl: "16px", "2xl": "20px", "3xl": "24px", full: "9999px",
  },

  border: {
    width: {
      thin: "1px",
      medium: "2px",
      thick: "3px",
    },

    style: "solid",

    default: { width: "1px", style: "solid", color: colors.border },
    accent: { width: "1px", style: "solid", color: colors.signalTeal },
  },

  shadow: {
    none: "none",
  },

  opacity: {
    disabled: 0.45,
    muted: 0.65,
    secondary: 0.8,
    active: 0.85,
    hover: 0.92,
    visible: 1,
  },

  semantic: {
    text: {
      primary: colors.text,
      secondary: colors.text,
      muted: colors.muted,
      subtle: colors.muted,
      inverse: colors.graphite,
      accent: colors.signalTeal,
    },

    surface: {
      default: colors.graphite,
      muted: colors.graphiteSoft,
      elevated: colors.graphiteSoft,
      dark: colors.graphite,
      darkSoft: colors.graphiteSoft,
    },

    border: {
      default: colors.border,
      strong: colors.border,
      accent: colors.signalTeal,
    },

    action: {
      primary: colors.signalTeal,
      primaryHoverOpacity: 0.92,
      primaryActiveOpacity: 0.85,

      secondary: colors.text,
      secondaryHoverOpacity: 0.92,

      ghost: "transparent",
      ghostHover: colors.graphiteSoft,
    },
  },

  components: {
    button: {
      height: { sm: "2rem", md: "2.5rem", lg: "3rem", xl: "3.5rem" },
      padding: { sm: "0 0.75rem", md: "0 1rem", lg: "0 1.25rem", xl: "0 1.5rem" },
      radius: "8px",
      fontSize: { sm: "0.8125rem", md: "0.875rem", lg: "0.9375rem", xl: "1rem" },
      fontWeight: 500,

      primary: {
        background: colors.signalTeal,
        foreground: colors.graphite,
        hoverOpacity: 0.92,
        activeOpacity: 0.85,
      },

      secondary: {
        background: colors.graphiteSoft,
        foreground: colors.text,
        border: colors.border,
        hoverOpacity: 0.92,
      },
    },

    input: {
      height: { sm: "2.25rem", md: "2.5rem", lg: "2.75rem" },
      padding: "0 0.875rem",
      radius: "8px",
      fontSize: "0.875rem",
      background: colors.graphiteSoft,
      border: colors.border,
      text: colors.text,
      placeholder: colors.muted,
    },

    card: {
      padding: { sm: "1rem", md: "1.5rem", lg: "2rem", xl: "2.5rem" },
      radius: "12px",
      border: colors.border,
      background: colors.graphiteSoft,
    },

    badge: {
      height: "1.75rem",
      padding: "0 0.625rem",
      radius: "9999px",
      fontFamily: "var(--font-plex-mono)",
      fontSize: "0.75rem",
      fontWeight: 400,
      background: colors.graphiteSoft,
      border: colors.border,
      text: colors.muted,
      accent: colors.signalTeal,
    },

    avatar: {
      size: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "4rem", xxl: "6rem" },
      radius: "9999px",
    },

    icon: {
      size: { xs: "0.75rem", sm: "1rem", md: "1.25rem", lg: "1.5rem", xl: "2rem", xxl: "2.5rem" },
    },
  },

  navigation: {
    height: { mobile: "4rem", lg: "5rem" },
    gap: { mobile: "1rem", sm: "1.25rem", md: "1.5rem", lg: "2rem" },
    fontSize: "0.875rem",
    fontWeight: 400,
    default: colors.muted,
    hover: colors.text,
    active: colors.text,
    accent: colors.signalTeal,
  },

  hero: {
    minHeight: { mobile: "auto", md: "640px", lg: "720px", xl: "800px" },
    paddingTop: { mobile: "5rem", sm: "6rem", md: "8rem", lg: "10rem", xl: "12rem" },
    paddingBottom: { mobile: "5rem", sm: "6rem", md: "8rem", lg: "10rem", xl: "12rem" },
    titleMaxWidth: "1000px",
    descriptionMaxWidth: "680px",
    titleWeight: 300,

    eyebrow: {
      fontFamily: "var(--font-plex-mono)",
      fontSize: "0.75rem",
      fontWeight: 400,
      letterSpacing: "0.015em",
      textTransform: "none",
      color: colors.signalTeal,
    },
  },

  projects: {
    grid: { mobile: 1, sm: 1, md: 2, lg: 2, xl: 3 },
    gap: { mobile: "1rem", sm: "1.25rem", md: "1.5rem", lg: "2rem", xl: "2rem" },
    imageAspectRatio: "16 / 10",
    titleWeight: 400,
    descriptionMaxWidth: "560px",

    technology: {
      fontFamily: "var(--font-plex-mono)",
      fontSize: "0.75rem",
      fontWeight: 400,
      color: colors.muted,
    },
  },

  experience: {
    gap: { mobile: "3rem", md: "4rem", lg: "5rem" },
    company: { fontSize: "1.125rem", fontWeight: 400 },
    role: { fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 300, letterSpacing: "-0.025em" },
    date: {
      fontFamily: "var(--font-plex-mono)",
      fontSize: "0.75rem",
      fontWeight: 400,
      color: colors.muted,
    },
  },

  blog: {
    grid: { mobile: 1, md: 2, lg: 3 },
    gap: { mobile: "2rem", md: "2.5rem", lg: "3rem" },
    title: { fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1.1, fontWeight: 300, letterSpacing: "-0.025em" },
    metadata: {
      fontFamily: "var(--font-plex-mono)",
      fontSize: "0.75rem",
      fontWeight: 400,
      color: colors.muted,
    },
    prose: { maxWidth: "720px", fontSize: "1.0625rem", lineHeight: 1.8 },
  },

  technical: {
    fontFamily: "var(--font-plex-mono)",
    color: colors.text,

    code: {
      fontFamily: "var(--font-plex-mono)",
      fontSize: "0.8125rem",
      lineHeight: 1.65,
      background: colors.graphiteSoft,
      border: colors.border,
      radius: "6px",
      padding: "0.125rem 0.375rem",
    },

    tag: {
      fontFamily: "var(--font-plex-mono)",
      fontSize: "0.75rem",
      fontWeight: 400,
      background: colors.graphiteSoft,
      border: colors.border,
      text: colors.muted,
      radius: "6px",
      padding: "0.375rem 0.625rem",
    },
  },

  interaction: {
    duration: { instant: "100ms", fast: "150ms", normal: "200ms", slow: "300ms", slower: "500ms" },
    easing: {
      standard: "cubic-bezier(0.2, 0, 0, 1)",
      emphasized: "cubic-bezier(0.16, 1, 0.3, 1)",
      linear: "linear",
    },
    hover: { translateY: "-1px", scale: "1.01" },
    reducedMotion: { duration: "0ms" },
  },

  zIndex: {
    base: 0, content: 1, dropdown: 10, sticky: 20, header: 30, overlay: 40, modal: 50, popover: 60, toast: 70, tooltip: 80,
  },

  accessibility: {
    minimumTouchTarget: "44px",
    focusRing: { width: "3px", offset: "2px", color: colors.signalTeal },
    minimumTextContrast: "WCAG AA",
    reducedMotionQuery: "(prefers-reduced-motion: reduce)",
  },

  media: {
    aspectRatio: {
      square: "1 / 1", portrait: "4 / 5", landscape: "4 / 3", wide: "16 / 10", video: "16 / 9", ultraWide: "21 / 9",
    },
    objectFit: "cover",
    imageRadius: "12px",
    avatarRadius: "9999px",
  },

  background: {
    page: colors.graphite,
    section: colors.graphite,
    surface: colors.graphiteSoft,
    elevated: colors.graphiteSoft,
    border: colors.border,
  },
} as const;

export type Theme = typeof theme;
export type ThemeColors = typeof colors;
