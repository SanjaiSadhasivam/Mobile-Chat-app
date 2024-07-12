export const groupMessagesByDate = messages => {
  if (!messages || messages.length === 0) {
    return [];
  }

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const getMonthName = monthIndex => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[monthIndex];
  };

  const groupedMessages = messages.reduce((acc, message) => {
    const messageDate = new Date(message.timeStamp);
    let dateLabel;

    if (isSameDay(messageDate, today)) {
      dateLabel = 'Today';
    } else if (isSameDay(messageDate, yesterday)) {
      dateLabel = 'Yesterday';
    } else {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());

      if (messageDate >= startOfWeek) {
        const dayOfWeek = messageDate.getDay();
        const dayNames = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];
        dateLabel = dayNames[dayOfWeek];
      } else {
        dateLabel = `${messageDate.getDate()} ${getMonthName(
          messageDate.getMonth(),
        )} ${messageDate.getFullYear()}`;
      }
    }

    if (!acc[dateLabel]) {
      acc[dateLabel] = [];
    }
    acc[dateLabel].push(message);
    return acc;
  }, {});

  const sortedKeys = Object.keys(groupedMessages).sort((a, b) => {
    if (a === 'Today') return 1;
    if (b === 'Today') return -1;
    if (a === 'Yesterday') return 1;
    if (b === 'Yesterday') return -1;
    return (
      new Date(groupedMessages[a][0].timeStamp) -
      new Date(groupedMessages[b][0].timeStamp)
    );
  });

  return sortedKeys.map(title => ({
    title,
    data: groupedMessages[title],
  }));
};
