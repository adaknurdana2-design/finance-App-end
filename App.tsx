import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AnalysisScreen, { AppTabKey, PeriodKey } from './src/screens/AnalysisScreen';
import SearchScreen from './src/screens/SearchScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import TransactionScreen from './src/screens/TransactionScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import AccountBalanceScreen from './src/screens/AccountBalanceScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import LaunchScreen from './src/screens/LaunchScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import SecurityPinScreen from './src/screens/SecurityPinScreen';
import NewPasswordScreen from './src/screens/NewPasswordScreen';

type RouteName =
  | AppTabKey
  | 'Launch'
  | 'Login'
  | 'SignUp'
  | 'ForgotPassword'
  | 'SecurityPin'
  | 'NewPassword'
  | 'Search'
  | 'Calendar'
  | 'Notification'
  | 'AccountBalance';

type PeriodFilter = 'Daily' | 'Weekly' | 'Monthly';

interface HomeTx {
  id: string;
  title: string;
  date: string;
  category: string;
  amount: string;
  isIncome: boolean;
  icon: string;
  period: PeriodFilter;
}

const HOME_TRANSACTIONS: HomeTx[] = [
  {
    id: '1',
    title: 'Salary',
    date: '18:27 - April 30',
    category: 'Monthly',
    amount: '$4.000,00',
    isIncome: true,
    icon: '💼',
    period: 'Monthly',
  },
  {
    id: '2',
    title: 'Groceries',
    date: '17:00 - April 24',
    category: 'Pantry',
    amount: '-$100,00',
    isIncome: false,
    icon: '🛍️',
    period: 'Weekly',
  },
  {
    id: '3',
    title: 'Rent',
    date: '8:30 - April 15',
    category: 'Rent',
    amount: '-$674,40',
    isIncome: false,
    icon: '🔑',
    period: 'Monthly',
  },
  {
    id: '4',
    title: 'Coffee',
    date: '09:15 - Today',
    category: 'Food',
    amount: '-$4,50',
    isIncome: false,
    icon: '☕',
    period: 'Daily',
  },
];

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<RouteName>('Launch');
  const [history, setHistory] = useState<RouteName[]>(['Launch']);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodKey>('Weekly');
  const [homeFilter, setHomeFilter] = useState<PeriodFilter>('Monthly');

  const navigate = (routeName: string, params?: { initialPeriod?: PeriodKey }) => {
    if (params?.initialPeriod) {
      setSelectedPeriod(params.initialPeriod);
    }
    const target = (routeName as RouteName) || 'Home';
    setHistory((prev) => [...prev, target]);
    setCurrentRoute(target);
  };

  const goBack = () => {
    setHistory((prev) => {
      if (prev.length <= 1) {
        setCurrentRoute('Launch');
        return ['Launch'];
      }
      const next = prev.slice(0, -1);
      setCurrentRoute(next[next.length - 1]);
      return next;
    });
  };

  const navigation = {
    navigate,
    goBack,
    canGoBack: () => history.length > 1,
  };

  switch (currentRoute) {
    case 'Launch':
      return <LaunchScreen navigation={navigation} />;
    case 'Login':
      return <LoginScreen navigation={navigation} />;
    case 'SignUp':
      return <SignUpScreen navigation={navigation} />;
    case 'ForgotPassword':
      return <ForgotPasswordScreen navigation={navigation} />;
    case 'SecurityPin':
      return <SecurityPinScreen navigation={navigation} />;
    case 'NewPassword':
      return <NewPasswordScreen navigation={navigation} />;
    case 'Analysis':
      return (
        <AnalysisScreen
          navigation={navigation}
          initialPeriod={selectedPeriod}
          onNavigateTab={(tab) => navigate(tab)}
          onBack={goBack}
        />
      );
    case 'Search':
      return <SearchScreen navigation={navigation} onNavigate={navigate} />;
    case 'Calendar':
      return <CalendarScreen navigation={navigation} onNavigate={navigate} />;
    case 'Categories':
      return <CategoriesScreen navigation={navigation} onNavigate={navigate} />;
    case 'Transactions':
      return <TransactionScreen navigation={navigation} />;
    case 'Notification':
      return <NotificationScreen navigation={navigation} />;
    case 'AccountBalance':
    case 'Profile':
      return <AccountBalanceScreen navigation={navigation} />;
    case 'Home':
    default: {
      const visibleTx = HOME_TRANSACTIONS.filter((item) =>
        homeFilter === 'Monthly' ? true : item.period === homeFilter
      );

      return (
        <SafeAreaView style={styles.homeContainer}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.homeScroll}>
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.greetingTitle}>Hi, Welcome Back</Text>
                <Text style={styles.greetingSubtitle}>Good Morning</Text>
              </View>
              <TouchableOpacity
                style={styles.notificationBtn}
                onPress={() => navigate('Notification')}
              >
                <Ionicons name="notifications-outline" size={20} color="#093030" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.balanceCard}
              activeOpacity={0.85}
              onPress={() => navigate('AccountBalance')}
            >
              <View style={styles.balanceRow}>
                <View style={styles.balanceCol}>
                  <Text style={styles.balanceLabel}>↗ Total Balance</Text>
                  <Text style={styles.balanceAmount}>$7,783.00</Text>
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.balanceCol}>
                  <Text style={styles.expenseLabel}>↗ Total Expense</Text>
                  <Text style={styles.expenseAmount}>-$1,187.40</Text>
                </View>
              </View>

              <View style={styles.progressContainer}>
                <View style={styles.progressBarBg}>
                  <View style={styles.progressBarFill} />
                </View>
                <Text style={styles.progressText}>30%                 $20,000.00</Text>
              </View>

              <Text style={styles.tipText}>☑ 30% Of Your Expenses, Looks Good.</Text>
            </TouchableOpacity>

            <View style={styles.mainContent}>
              <TouchableOpacity
                style={styles.statsCard}
                activeOpacity={0.85}
                onPress={() => navigate('Analysis', { initialPeriod: 'Weekly' })}
              >
                <View style={styles.savingsBox}>
                  <View style={styles.circleProgress}>
                    <Text style={styles.carEmoji}>🚗</Text>
                  </View>
                  <Text style={styles.savingsText}>Savings{'\n'}On Goals</Text>
                </View>

                <View style={styles.statsDivider} />

                <View style={styles.revenueBox}>
                  <View style={styles.revenueItem}>
                    <Text style={styles.revenueIcon}>📦</Text>
                    <View>
                      <Text style={styles.revenueLabel}>Revenue Last Week</Text>
                      <Text style={styles.revenueVal}>$4,000.00</Text>
                    </View>
                  </View>
                  <View style={styles.revenueItem}>
                    <Text style={styles.revenueIcon}>🍽️</Text>
                    <View>
                      <Text style={styles.revenueLabel}>Food Last Week</Text>
                      <Text style={styles.revenueValRed}>-$100.00</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <View style={styles.quickNavRow}>
                <TouchableOpacity
                  style={styles.quickNavBtn}
                  onPress={() => navigate('Analysis', { initialPeriod: 'Daily' })}
                >
                  <Ionicons name="stats-chart-outline" size={15} color="#093030" />
                  <Text style={styles.quickNavText}>Analysis</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.quickNavBtn}
                  onPress={() => navigate('Search')}
                >
                  <Ionicons name="search-outline" size={15} color="#093030" />
                  <Text style={styles.quickNavText}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.quickNavBtn}
                  onPress={() => navigate('Calendar')}
                >
                  <Ionicons name="calendar-outline" size={15} color="#093030" />
                  <Text style={styles.quickNavText}>Calendar</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.filterRow}>
                {(['Daily', 'Weekly', 'Monthly'] as PeriodFilter[]).map((period) => {
                  const isActive = homeFilter === period;
                  return (
                    <TouchableOpacity
                      key={period}
                      style={[styles.filterTab, isActive && styles.filterTabActive]}
                      onPress={() => setHomeFilter(period)}
                    >
                      <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                        {period}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>Transactions</Text>
                <TouchableOpacity onPress={() => navigate('Transactions')}>
                  <Text style={styles.seeAllText}>All</Text>
                </TouchableOpacity>
              </View>

              {visibleTx.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.transactionItem}
                  activeOpacity={0.85}
                  onPress={() => navigate('Transactions')}
                >
                  <View style={styles.transIconBlue}>
                    <Text style={styles.transEmoji}>{item.icon}</Text>
                  </View>
                  <View style={styles.transDetails}>
                    <Text style={styles.transTitle}>{item.title}</Text>
                    <Text style={styles.transDate}>{item.date}</Text>
                  </View>
                  <View style={styles.transRight}>
                    <Text style={styles.transCategory}>{item.category}</Text>
                    <Text
                      style={item.isIncome ? styles.transAmountGreen : styles.transAmountRed}
                    >
                      {item.amount}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View style={styles.bottomNav}>
            <TouchableOpacity
              style={[styles.navItem, styles.navItemActive]}
              onPress={() => navigate('Home')}
            >
              <Ionicons name="home-outline" size={22} color="#093030" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigate('Analysis')}
            >
              <Ionicons name="stats-chart-outline" size={20} color="#093030" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigate('Transactions')}
            >
              <MaterialCommunityIcons name="swap-horizontal" size={24} color="#093030" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigate('Categories')}
            >
              <Ionicons name="layers-outline" size={22} color="#093030" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigate('AccountBalance')}
            >
              <Ionicons name="person-outline" size={22} color="#093030" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  homeContainer: { flex: 1, backgroundColor: '#35C29B' },
  homeScroll: { paddingBottom: 16 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 15,
  },
  greetingTitle: { fontSize: 20, fontWeight: 'bold', color: '#093030' },
  greetingSubtitle: { fontSize: 12, color: '#093030', opacity: 0.7 },
  notificationBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceCard: { marginHorizontal: 20, backgroundColor: '#35C29B', marginBottom: 15 },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  balanceCol: { flex: 1 },
  verticalDivider: {
    width: 1,
    height: 35,
    backgroundColor: '#093030',
    opacity: 0.2,
    marginHorizontal: 15,
  },
  balanceLabel: { fontSize: 11, color: '#093030', marginBottom: 4 },
  balanceAmount: { fontSize: 20, fontWeight: 'bold', color: '#093030' },
  expenseLabel: { fontSize: 11, color: '#093030', marginBottom: 4 },
  expenseAmount: { fontSize: 20, fontWeight: 'bold', color: '#093030' },
  progressContainer: { marginBottom: 8 },
  progressBarBg: {
    height: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBarFill: { width: '30%', height: '100%', backgroundColor: '#093030' },
  progressText: { fontSize: 10, color: '#093030', fontWeight: '600' },
  tipText: { fontSize: 11, color: '#093030', marginTop: 5 },
  mainContent: {
    flex: 1,
    backgroundColor: '#F3FFF6',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 24,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#35C29B',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    marginBottom: 14,
  },
  savingsBox: { alignItems: 'center', flex: 1 },
  circleProgress: {
    width: 55,
    height: 55,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  carEmoji: { fontSize: 22 },
  savingsText: { fontSize: 11, fontWeight: 'bold', color: '#093030', textAlign: 'center' },
  statsDivider: {
    width: 1,
    height: 60,
    backgroundColor: '#093030',
    opacity: 0.15,
    marginHorizontal: 10,
  },
  revenueBox: { flex: 1.5, gap: 10 },
  revenueItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  revenueIcon: { fontSize: 16 },
  revenueLabel: { fontSize: 10, color: '#093030', opacity: 0.7 },
  revenueVal: { fontSize: 13, fontWeight: 'bold', color: '#093030' },
  revenueValRed: { fontSize: 13, fontWeight: 'bold', color: '#E53935' },
  quickNavRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  quickNavBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: '#E4F6EA',
    paddingVertical: 8,
    borderRadius: 16,
  },
  quickNavText: { fontSize: 12, fontWeight: '700', color: '#093030' },
  filterRow: {
    flexDirection: 'row',
    backgroundColor: '#E4F6EA',
    borderRadius: 25,
    padding: 4,
    marginBottom: 20,
  },
  filterTab: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 20 },
  filterTabActive: { backgroundColor: '#35C29B' },
  filterText: { fontSize: 12, color: '#093030', fontWeight: '600' },
  filterTextActive: { fontWeight: 'bold' },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#093030' },
  seeAllText: { fontSize: 12, fontWeight: 'bold', color: '#00A878' },
  transactionItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  transIconBlue: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E4F6EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transEmoji: { fontSize: 18 },
  transDetails: { flex: 1 },
  transTitle: { fontSize: 14, fontWeight: 'bold', color: '#093030' },
  transDate: { fontSize: 11, color: '#666', marginTop: 2 },
  transRight: { alignItems: 'flex-end' },
  transCategory: { fontSize: 11, color: '#666', marginBottom: 2 },
  transAmountGreen: { fontSize: 13, fontWeight: 'bold', color: '#2E7D32' },
  transAmountRed: { fontSize: 13, fontWeight: 'bold', color: '#E53935' },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#DFF7E2',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  navItemActive: { backgroundColor: '#00D09E' },
});