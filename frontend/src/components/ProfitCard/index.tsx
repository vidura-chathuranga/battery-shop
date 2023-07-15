import { createStyles, Text, Card, RingProgress, Group, rem } from '@mantine/core';
import AdminDashboardHeader from '../adminDashboardHeader';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    lineHeight: 1,
  },

  lead: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: rem(22),
    lineHeight: 1,
  },

  inner: {
    display: 'flex',

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  ring: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',

    [theme.fn.smallerThan('xs')]: {
      justifyContent: 'center',
      marginTop: theme.spacing.md,
    },
  },
}));

interface StatsProfitCard {
  title: string;
  completed: number;
  total: number;
  stats: {
    value: number;
    label: string;
  }[];
}

// title, completed, total, stats

export function StatsProfitCard({ title, completed, total, stats }: StatsProfitCard) { 
  const { classes, theme } = useStyles();
//   const items = stats.map((stat) => (
//     <div key={stat.label}>
//       <Text className={classes.label}>{stat.value}</Text>
//       <Text size="xs" color="dimmed">
//         {stat.label}
//       </Text>
//     </div>

// ));

  return (
    <>
    <AdminDashboardHeader/>
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <div className={classes.inner}>
        <div>
          <Text fz="xl" className={classes.label}>
            {title}
          </Text>
          <div>
            <Text className={classes.lead} mt={30}>
              {completed}
            </Text>
            <Text fz="xs" color="dimmed">
              Completed
            </Text>
          </div>
          {/* <Group mt="lg">{items}</Group> */}
        </div>

        <div className={classes.ring}>
          <RingProgress
            roundCaps
            thickness={6}
            size={150}
            sections={[{ value: (completed / total) * 100, color: theme.primaryColor }]}
            label={
              <div>
                <Text ta="center" fz="lg" className={classes.label}>
                  {((completed / total) * 100).toFixed(0)}%
                </Text>
                <Text ta="center" fz="xs" c="dimmed">
                  Completed
                </Text>
              </div>
            }
          />
        </div>
      </div>
    </Card>
    </>
  );
}

export default StatsProfitCard;