package notifier_models

type NotificationType string

const (
	NotificationTypeSuccess NotificationType = "SUCCESS"
	NotificationTypeFailure NotificationType = "FAILURE"
)
