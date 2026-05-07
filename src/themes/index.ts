import config from '../config'

export const theme = {
    // backgrounds
    bgPrimary: config.theme.primaryColor,
    bgCard: 'rgba(0,0,0,0.04)',
    bgInput: 'rgba(0,0,0,0.06)',

    // text
    textPrimary: '#1a1a1a',
    textSecondary: '#6b7280',
    textMuted: '#9ca3af',
    textOnAccent: '#ffffff',

    // accent
    accent: config.theme.accentColor,

    // borders
    border: 'rgba(0,0,0,0.08)',
    borderHover: 'rgba(0,0,0,0.16)',

    // status
    success: '#22c55e',
    danger: '#ef4444',
    warning: '#f59e0b',
}
